"use client";

import { useState, useEffect, useCallback } from "react";
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
  Leaf,
  UserCircle,
  Hash,
  Calendar,
  Banknote,
  FileText,
} from "lucide-react";
import CrudToolbar from "../components/CrudToolbar";

// Cấu hình URL backend cho bảo vệ môi trường
const API_URL = "http://localhost:5000/nhiem-vu-bvmt";

type NhiemVuMT = {
  id?: number;
  ten: string;
  loai: string;
  chu_nhiem: number;
  thoi_gian: string;
  noi_dung: string;
  ket_qua_san_pham: string;
  kinh_phi: number;
};

const emptyNhiemVu: NhiemVuMT = {
  ten: "",
  loai: "",
  chu_nhiem: 1,
  thoi_gian: "",
  noi_dung: "",
  ket_qua_san_pham: "",
  kinh_phi: 0,
};

export default function BaoVeMoiTruongPage() {
  const [rows, setRows] = useState<NhiemVuMT[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<NhiemVuMT | null>(null);
  const [form, setForm] = useState<NhiemVuMT>(emptyNhiemVu);

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
        // Ràng buộc dữ liệu (Fix uncontrolled input)
        setForm({
          id: data.id,
          ten: data.ten ?? "",
          loai: data.loai ?? "",
          chu_nhiem: data.chu_nhiem ?? "",
          thoi_gian: data.thoi_gian ?? "",
          noi_dung: data.noi_dung ?? "",
          ket_qua_san_pham: data.ket_qua_san_pham ?? "",
          kinh_phi: Number(data.kinh_phi) || 0,
        });
      } catch (error) {
        alert("Không thể lấy thông tin nhiệm vụ");
      }
    } else {
      setEditing(null);
      setForm(emptyNhiemVu);
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.ten.trim()) return alert("Vui lòng nhập tên nhiệm vụ!");
    try {
      const object = {
        ten: form.ten,
        loai: form.loai || null,
        chu_nhiem: form.chu_nhiem,
        thoi_gian: form.thoi_gian || null,
        noi_dung: form.noi_dung || null,
        ket_qua_san_pham: form.ket_qua_san_pham || null,
        kinh_phi: form.kinh_phi || null,
      };
      if (editing) {
        await axios.patch(`${API_URL}/update/${editing.id}`, object);
      } else {
        await axios.post(`${API_URL}/create`, object);
      }
      fetchData();
      setShow(false);
    } catch (error) {
      alert("Lưu dữ liệu thất bại");
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (confirm("Xác nhận xóa nhiệm vụ bảo vệ môi trường này?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setRows((prev) => prev.filter((x) => x.id !== id));
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <CrudToolbar
        title="Quản lý Nhiệm vụ Bảo vệ Môi trường"
        search={search}
        onSearch={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <Card className="shadow-sm border-0 mt-3">
        <Table hover responsive className="align-middle mb-0 text-nowrap">
          <thead className="bg-light">
            <tr>
              <th style={{ width: 90 }}>
                <Hash size={16} /> Mã NV
              </th>
              <th>
                <Leaf size={16} /> Tên nhiệm vụ & Loại
              </th>
              <th>
                <UserCircle size={16} /> Chủ nhiệm
              </th>
              <th>
                <Calendar size={16} /> Thời gian
              </th>
              <th className="text-end">
                <Banknote size={16} /> Kinh phí
              </th>
              <th style={{ width: 120 }} className="text-end">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-5">
                  <Spinner animation="border" variant="success" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  Chưa có dữ liệu nhiệm vụ.
                </td>
              </tr>
            ) : (
              rows.map((x) => (
                <tr key={x.id}>
                  <td className="text-muted fw-bold">{x.id}</td>
                  <td style={{ maxWidth: "350px", whiteSpace: "normal" }}>
                    <div className="fw-bold text-dark">{x.ten}</div>
                    <Badge bg="success" className="mt-1 fw-normal">
                      {x.loai}
                    </Badge>
                  </td>
                  <td className="fw-semibold">{x.chu_nhiem}</td>
                  <td>{x.thoi_gian}</td>
                  <td className="text-end fw-bold text-danger">
                    {x.kinh_phi ? x.kinh_phi.toLocaleString("vi-VN") : 0} VNĐ
                  </td>
                  <td className="text-end">
                    <Button
                      variant="light"
                      className="text-warning me-2 border-0"
                      onClick={() => handleOpenModal(x.id)}
                    >
                      <Edit3 size={18} />
                    </Button>
                    <Button
                      variant="light"
                      className="text-danger border-0"
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
      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-success">
            {editing ? "Sửa Nhiệm vụ Bảo vệ Môi trường" : "Thêm Nhiệm vụ mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={9}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    TÊN NHIỆM VỤ
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={form.ten}
                    onChange={(e) => setForm({ ...form, ten: e.target.value })}
                    placeholder="Nhập tên nhiệm vụ bảo vệ môi trường..."
                    autoFocus
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    LOẠI NHIỆM VỤ
                  </Form.Label>
                  <Form.Control
                    value={form.loai}
                    onChange={(e) => setForm({ ...form, loai: e.target.value })}
                    placeholder="VD: Cấp Tỉnh, Cấp Cơ sở..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    CHỦ NHIỆM
                  </Form.Label>
                  <Form.Control
                    value={form.chu_nhiem}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        chu_nhiem: e.target.value
                          ? parseInt(e.target.value)
                          : 0,
                      })
                    }
                    placeholder="Họ và tên chủ nhiệm..."
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    THỜI GIAN THỰC HIỆN
                  </Form.Label>
                  <Form.Control
                    value={form.thoi_gian}
                    onChange={(e) =>
                      setForm({ ...form, thoi_gian: e.target.value })
                    }
                    placeholder="VD: 2023 - 2024"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    KINH PHÍ (VNĐ)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={form.kinh_phi}
                    onChange={(e) =>
                      setForm({ ...form, kinh_phi: Number(e.target.value) })
                    }
                    placeholder="Nhập số tiền..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    <FileText size={14} className="me-1" />
                    NỘI DUNG NHIỆM VỤ
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={form.noi_dung}
                    onChange={(e) =>
                      setForm({ ...form, noi_dung: e.target.value })
                    }
                    placeholder="Mô tả tóm tắt nội dung thực hiện..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    <FileText size={14} className="me-1" />
                    KẾT QUẢ / SẢN PHẨM
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={form.ket_qua_san_pham}
                    onChange={(e) =>
                      setForm({ ...form, ket_qua_san_pham: e.target.value })
                    }
                    placeholder="Các sản phẩm, báo cáo, kết quả đạt được..."
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
            variant="success"
            className="text-white px-4"
            onClick={handleSave}
          >
            {editing ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
