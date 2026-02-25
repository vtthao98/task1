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
  Book,
  Hash,
  Calendar,
  Printer,
  Barcode,
  Globe2,
} from "lucide-react";
import CrudToolbar from "../components/CrudToolbar";

// Cấu hình URL backend cho Sách
const API_URL = "http://localhost:5000/sach";

type Sach = {
  id?: number;
  ten: string;
  loai_sach: string;
  chi_so_ISBN: string;
  nha_xuat_ban: string;
  thoi_gian_xuat_ban: string;
  linh_vuc: string;
  xuat_xu: number;
};

const emptySach: Sach = {
  ten: "",
  loai_sach: "",
  chi_so_ISBN: "",
  nha_xuat_ban: "",
  thoi_gian_xuat_ban: "",
  linh_vuc: "",
  xuat_xu: 0,
};

export default function SachPage() {
  const [rows, setRows] = useState<Sach[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<Sach | null>(null);
  const [form, setForm] = useState<Sach>(emptySach);

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
      console.error("Lỗi kết nối Backend:", error);
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
          loai_sach: data.loai_sach ?? "",
          chi_so_ISBN: data.chi_so_ISBN ?? "",
          nha_xuat_ban: data.nha_xuat_ban ?? "",
          thoi_gian_xuat_ban: data.thoi_gian_xuat_ban ?? "",
          linh_vuc: data.linh_vuc ?? "",
          xuat_xu: data.xuat_xu ?? "",
        });
      } catch (error) {
        alert("Không thể lấy thông tin sách");
      }
    } else {
      setEditing(null);
      setForm(emptySach);
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.ten.trim()) return alert("Vui lòng nhập tên sách!");

    try {
      const object = {
        ten: form.ten,
        loai_sach: form.loai_sach || null,
        chi_so_ISBN: form.chi_so_ISBN || null,
        nha_xuat_ban: form.nha_xuat_ban || null,
        thoi_gian_xuat_ban: form.thoi_gian_xuat_ban || null,
        linh_vuc: form.linh_vuc || null,
        xuat_xu: parseInt(form.xuat_xu + ""),
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
    if (confirm("Xác nhận xóa cuốn sách này?")) {
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
        title="Quản lý Danh mục Sách"
        search={search}
        onSearch={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <Card className="shadow-sm border-0 mt-3">
        <Table hover responsive className="align-middle mb-0 text-nowrap">
          <thead className="bg-light">
            <tr>
              <th style={{ width: 90 }}>
                <Hash size={16} /> Mã Sách
              </th>
              <th>
                <Book size={16} /> Tên sách & Loại
              </th>
              <th>
                <Printer size={16} /> Xuất bản
              </th>
              <th>
                <Barcode size={16} /> ISBN
              </th>
              <th>
                <Globe2 size={16} /> Lĩnh vực & Xuất xứ
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
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  Chưa có dữ liệu sách.
                </td>
              </tr>
            ) : (
              rows.map((x) => (
                <tr key={x.id}>
                  <td className="text-muted fw-bold">{x.id}</td>
                  <td style={{ maxWidth: "300px", whiteSpace: "normal" }}>
                    <div className="fw-bold text-dark">{x.ten}</div>
                    <Badge bg="info" className="mt-1 fw-normal">
                      {x.loai_sach}
                    </Badge>
                  </td>
                  <td>
                    <div className="fw-semibold">{x.nha_xuat_ban}</div>
                    <small className="text-muted">
                      <Calendar size={14} className="me-1" />
                      {x.thoi_gian_xuat_ban}
                    </small>
                  </td>
                  <td className="fw-medium text-secondary">{x.chi_so_ISBN}</td>
                  <td>
                    <div>{x.linh_vuc}</div>
                    <small className="text-muted">{x.xuat_xu}</small>
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
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            {editing ? "Sửa thông tin Sách" : "Thêm Sách mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">
                TÊN SÁCH
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={form.ten}
                onChange={(e) => setForm({ ...form, ten: e.target.value })}
                placeholder="Nhập tên sách..."
                autoFocus
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    LOẠI SÁCH
                  </Form.Label>
                  <Form.Control
                    value={form.loai_sach}
                    onChange={(e) =>
                      setForm({ ...form, loai_sach: e.target.value })
                    }
                    placeholder="VD: Giáo trình, Sách tham khảo..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    CHỈ SỐ ISBN
                  </Form.Label>
                  <Form.Control
                    value={form.chi_so_ISBN}
                    onChange={(e) =>
                      setForm({ ...form, chi_so_ISBN: e.target.value })
                    }
                    placeholder="Nhập mã ISBN..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    NHÀ XUẤT BẢN
                  </Form.Label>
                  <Form.Control
                    value={form.nha_xuat_ban}
                    onChange={(e) =>
                      setForm({ ...form, nha_xuat_ban: e.target.value })
                    }
                    placeholder="Tên nhà xuất bản..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    THỜI GIAN XUẤT BẢN
                  </Form.Label>
                  <Form.Control
                    value={form.thoi_gian_xuat_ban}
                    onChange={(e) =>
                      setForm({ ...form, thoi_gian_xuat_ban: e.target.value })
                    }
                    placeholder="VD: 2023 hoặc 10/2023..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    LĨNH VỰC
                  </Form.Label>
                  <Form.Control
                    value={form.linh_vuc}
                    onChange={(e) =>
                      setForm({ ...form, linh_vuc: e.target.value })
                    }
                    placeholder="Lĩnh vực chuyên môn..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    XUẤT XỨ CỦA CÔNG TRÌNH
                  </Form.Label>
                  <Form.Control
                    value={form.xuat_xu}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        xuat_xu: e.target.value ? parseInt(e.target.value) : 0,
                      })
                    }
                    placeholder="Trong nước, Quốc tế..."
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
            variant="primary"
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
