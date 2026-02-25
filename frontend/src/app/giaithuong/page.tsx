"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Modal,
  Table,
  Spinner,
  Card,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import {
  Edit3,
  Trash2,
  Trophy,
  Medal,
  Hash,
  Calendar,
  Banknote,
  Star,
} from "lucide-react";
import CrudToolbar from "../components/CrudToolbar";

// 1. Cấu hình đúng URL của NestJS cho Giải thưởng
const API_URL = "http://localhost:5000/giai-thuong";

// 2. Cấu trúc dữ liệu có dấu gạch dưới (_)
type GiaiThuong = {
  id?: number;
  ten: string;
  linh_vuc?: string;
  cap_khen_thuong?: string;
  xep_hang?: string;
  gia_tri_giai_thuong?: string;
  nam_khen_thuong?: number;
};

// Khởi tạo giá trị rỗng (tránh lỗi undefined cho input)
const emptyAward: GiaiThuong = {
  ten: "",
  linh_vuc: "",
  cap_khen_thuong: "",
  xep_hang: "",
  gia_tri_giai_thuong: "",
  nam_khen_thuong: 0,
};

export default function GiaiThuongPage() {
  const [rows, setRows] = useState<GiaiThuong[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<GiaiThuong | null>(null);
  const [form, setForm] = useState<GiaiThuong>(emptyAward);

  // --- API OPERATIONS ---

  const fetchData = useCallback(async (keyword: string = "") => {
    setLoading(true);
    try {
      const url = keyword
        ? `${API_URL}/search?key=${keyword}`
        : `${API_URL}/all`;

      const res = await axios.get(url);
      setRows(res.data.data || res.data || []);
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(search), 500);
    return () => clearTimeout(timer);
  }, [search, fetchData]);

  const handleOpenModal = async (id?: number) => {
    if (id) {
      try {
        const res = await axios.get(`${API_URL}/one/${id}`);
        const data = res.data.data || res.data;

        setEditing(data);
        // Ràng buộc dữ liệu (Dùng ?? "" để tránh lỗi uncontrolled input)
        setForm({
          id: data.id,
          ten: data.ten ?? "",
          linh_vuc: data.linh_vuc ?? "",
          cap_khen_thuong: data.cap_khen_thuong ?? "",
          xep_hang: data.xep_hang ?? "",
          gia_tri_giai_thuong: "",
          nam_khen_thuong: data.nam_khen_thuong ?? "",
        });
      } catch (error) {
        alert("Không thể lấy thông tin giải thưởng");
      }
    } else {
      setEditing(null);
      setForm(emptyAward);
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.ten.trim()) return alert("Vui lòng nhập tên giải thưởng!");
    try {
      const object = {
        ten: form.ten ?? "",
        linh_vuc: form.linh_vuc || null,
        cap_khen_thuong: form.cap_khen_thuong || null,
        xep_hang: form.xep_hang || null,
        gia_tri_giai_thuong: form.gia_tri_giai_thuong || null,
        nam_khen_thuong: form.nam_khen_thuong || null,
      };
      if (editing) {
        // Dùng id thay cho id
        await axios.patch(`${API_URL}/update/${editing.id}`, object);
      } else {
        console.log("Thêm mới:", form);
        await axios.post(`${API_URL}/create`, object);
      }
      fetchData();
      setShow(false);
    } catch (error) {
      alert("Lưu dữ liệu thất bại");
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (confirm("Xác nhận xóa giải thưởng này?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        // Lọc dựa trên id
        setRows((prev) => prev.filter((x) => x.id !== id));
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <CrudToolbar
        title="Quản lý Giải thưởng"
        search={search}
        onSearch={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <Card className="shadow-sm border-0 mt-3">
        <Table hover responsive className="align-middle mb-0 text-nowrap">
          <thead className="bg-light">
            <tr>
              <th style={{ width: 90 }}>
                <Hash size={16} /> Mã GT
              </th>
              <th>
                <Trophy size={16} /> Tên giải thưởng & Lĩnh vực
              </th>
              <th>
                <Medal size={16} /> Cấp & Xếp hạng
              </th>
              <th>
                <Calendar size={16} /> Năm
              </th>
              <th className="text-end">
                <Banknote size={16} /> Giá trị
              </th>
              <th className="text-end">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-5">
                  <Spinner animation="border" variant="warning" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  Chưa có dữ liệu giải thưởng.
                </td>
              </tr>
            ) : (
              rows.map((x) => (
                <tr key={x.id}>
                  <td className="text-muted fw-bold">{x.id}</td>
                  <td style={{ maxWidth: "300px", whiteSpace: "normal" }}>
                    <div className="fw-bold text-dark">{x.ten}</div>
                    <small className="text-primary">{x.linh_vuc}</small>
                  </td>
                  <td>
                    <div>
                      <Badge bg="danger" className="fw-normal">
                        {x.cap_khen_thuong}
                      </Badge>
                    </div>
                    <small className="text-muted mt-1 d-inline-block">
                      <Star size={14} className="text-warning me-1" />
                      {x.xep_hang}
                    </small>
                  </td>
                  <td className="fw-medium">{x.nam_khen_thuong}</td>
                  <td className="text-end text-success fw-bold">
                    {x.gia_tri_giai_thuong}
                  </td>
                  <td className="text-end">
                    <Button
                      variant="light"
                      className="text-warning me-2"
                      onClick={() => handleOpenModal(x.id)}
                    >
                      <Edit3 size={18} />
                    </Button>
                    <Button
                      variant="light"
                      className="text-danger"
                      onClick={() => handleDelete(x.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal Form */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-warning">
            {editing ? "Sửa thông tin Giải thưởng" : "Thêm Giải thưởng mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">TÊN GIẢI THƯỞNG</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={form.ten}
                onChange={(e) => setForm({ ...form, ten: e.target.value })}
                placeholder="Nhập tên giải thưởng..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">LĨNH VỰC</Form.Label>
                  <Form.Control
                    value={form.linh_vuc}
                    onChange={(e) =>
                      setForm({ ...form, linh_vuc: e.target.value })
                    }
                    placeholder="VD: Khoa học công nghệ, Thể thao..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    CẤP KHEN THƯỞNG
                  </Form.Label>
                  <Form.Control
                    value={form.cap_khen_thuong}
                    onChange={(e) =>
                      setForm({ ...form, cap_khen_thuong: e.target.value })
                    }
                    placeholder="VD: Cấp Bộ, Cấp Nhà nước..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">XẾP HẠNG</Form.Label>
                  <Form.Control
                    value={form.xep_hang}
                    onChange={(e) =>
                      setForm({ ...form, xep_hang: e.target.value })
                    }
                    placeholder="VD: Giải Nhất, Huy chương Vàng..."
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    NĂM KHEN THƯỞNG
                  </Form.Label>
                  <Form.Control
                    value={form.nam_khen_thuong}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nam_khen_thuong: e.target.value
                          ? parseInt(e.target.value)
                          : 0,
                      })
                    }
                    placeholder="VD: 2024"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    GIÁ TRỊ (VNĐ)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={form.gia_tri_giai_thuong}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gia_tri_giai_thuong: e.target.value,
                      })
                    }
                    placeholder="Nhập số tiền..."
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" onClick={() => setShow(false)}>
            Hủy bỏ
          </Button>
          <Button
            variant="warning"
            className="text-dark fw-bold"
            onClick={handleSave}
          >
            {editing ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
