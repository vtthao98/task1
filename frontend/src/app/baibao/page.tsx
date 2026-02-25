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
} from "react-bootstrap";
import {
  Edit3,
  Trash2,
  Plus,
  Search,
  BookOpen,
  Calendar,
  ShieldCheck,
  BarChart3,
  Hash,
} from "lucide-react";
import CrudToolbar from "../components/CrudToolbar";
import { INTEGER } from "sequelize";

// 1. Cấu hình đúng URL của NestJS cho bài báo
const API_URL = "http://localhost:5000/bai-bao";

// 2. Cấu trúc dữ liệu có dấu gạch dưới (_)
type Article = {
  id?: number;
  ten_bai_bao: string;
  ten_tap_chi: string;
  chi_so_ISSN: string;
  danh_muc_xep_hang: string;
  he_so_anh_huong_IF: number;
  muc_xep_hang: string;
  thoi_gian_dang_bai: string;
  linh_vuc: string;
  xuat_xu: number;
};

// Khởi tạo giá trị rỗng (tránh lỗi undefined cho input)
const emptyArticle: Article = {
  ten_bai_bao: "",
  ten_tap_chi: "",
  chi_so_ISSN: "",
  danh_muc_xep_hang: "",
  he_so_anh_huong_IF: 0,
  muc_xep_hang: "",
  thoi_gian_dang_bai: new Date().toISOString().split("T")[0],
  linh_vuc: "",
  xuat_xu: 0,
};

export default function BaiBaoPage() {
  const [rows, setRows] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<Article>(emptyArticle);

  // --- API OPERATIONS ---

  const fetchData = useCallback(async (keyword: string = "") => {
    setLoading(true);
    try {
      const url = keyword
        ? `${API_URL}/search?key=${keyword}`
        : `${API_URL}/all`;

      const res = await axios.get(url);
      // NestJS trả về data: [{}]
      setRows(res.data.data || []);
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
        const data = res.data.data;
        setEditing(data);
        // Ràng buộc dữ liệu (Dùng ?? "" để tránh lỗi uncontrolled input)
        setForm({
          ...data,
          ten_bai_bao: data.ten_bai_bao ?? "",
          ten_tap_chi: data.ten_tap_chi ?? "",
          chi_so_ISSN: data.chi_so_ISSN ?? "",
          danh_muc_xep_hang: data.danh_muc_xep_hang ?? "",
          muc_xep_hang: data.muc_xep_hang ?? "",
          linh_vuc: data.linh_vuc ?? "",
          xuat_xu: data.xuat_xu ?? "",
        });
      } catch (error) {
        alert("Không thể lấy thông tin bài báo");
      }
    } else {
      setEditing(null);
      setForm(emptyArticle);
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.ten_bai_bao.trim()) return alert("Vui lòng nhập tên bài báo!");
    try {
      const object = {
        chi_so_ISSN: form.chi_so_ISSN || null,
        danh_muc_xep_hang: form.danh_muc_xep_hang || null,
        he_so_anh_huong_IF: form.he_so_anh_huong_IF,
        linh_vuc: form.linh_vuc || null,
        muc_xep_hang: form.muc_xep_hang || null,
        ten_bai_bao: form.ten_bai_bao,
        ten_tap_chi: form.ten_tap_chi || null,
        thoi_gian_dang_bai: form.thoi_gian_dang_bai || null,
        xuat_xu: parseInt(form.xuat_xu + ""),
      };
      if (editing) {
        await axios.patch(`${API_URL}/update/${editing.id}`, object);
      } else {
        console.log(form);
        await axios.post(`${API_URL}/create`, object);
      }
      fetchData();
      setShow(false);
    } catch (error) {
      alert("Lưu dữ liệu thất bại");
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (confirm("Xác nhận xóa bài báo này?")) {
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
        title="Quản lý Bài báo"
        search={search}
        onSearch={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <Card className="shadow-sm border-0 mt-3">
        <Table hover responsive className="align-middle mb-0 text-nowrap">
          <thead className="bg-light">
            <tr>
              <th style={{ width: 80 }}>
                <Hash size={16} /> ID
              </th>
              <th>Nội dung bài báo</th>
              <th>Tạp chí & Năm</th>
              <th>Xếp hạng / IF</th>
              <th className="text-end">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">
                  Chưa có dữ liệu bài báo.
                </td>
              </tr>
            ) : (
              rows.map((x) => (
                <tr key={x.id}>
                  <td className="text-muted fw-bold">{x.id}</td>
                  <td style={{ maxWidth: "300px", whiteSpace: "normal" }}>
                    <div className="fw-bold text-dark">{x.ten_bai_bao}</div>
                    <small className="text-primary">
                      {x.linh_vuc} | {x.xuat_xu}
                    </small>
                  </td>
                  <td>
                    <div>
                      <BookOpen size={14} /> {x.ten_tap_chi}
                    </div>
                    <small className="text-muted">
                      <Calendar size={14} /> {x.thoi_gian_dang_bai}
                    </small>
                  </td>
                  <td>
                    <div>
                      <ShieldCheck size={14} /> {x.danh_muc_xep_hang} (
                      {x.muc_xep_hang})
                    </div>
                    <small className="text-success">
                      <BarChart3 size={14} /> IF: {x.he_so_anh_huong_IF}
                    </small>
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
          <Modal.Title className="fw-bold">
            {editing ? "Sửa bài báo" : "Thêm bài báo mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">TÊN BÀI BÁO</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={form.ten_bai_bao}
                onChange={(e) =>
                  setForm({ ...form, ten_bai_bao: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">TÊN TẠP CHÍ</Form.Label>
                  <Form.Control
                    value={form.ten_tap_chi}
                    onChange={(e) =>
                      setForm({ ...form, ten_tap_chi: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">CHỈ SỐ ISSN</Form.Label>
                  <Form.Control
                    value={form.chi_so_ISSN}
                    onChange={(e) =>
                      setForm({ ...form, chi_so_ISSN: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    DANH MỤC XẾP HẠNG
                  </Form.Label>
                  <Form.Select
                    value={form.danh_muc_xep_hang}
                    onChange={(e) =>
                      setForm({ ...form, danh_muc_xep_hang: e.target.value })
                    }
                  >
                    <option value="">-- Chọn --</option>
                    <option value="Scopus">Scopus</option>
                    <option value="WoS">WoS</option>
                    <option value="Khác">Khác</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    MỨC XẾP HẠNG (Q)
                  </Form.Label>
                  <Form.Control
                    value={form.muc_xep_hang}
                    onChange={(e) =>
                      setForm({ ...form, muc_xep_hang: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">HỆ SỐ IF</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={form.he_so_anh_huong_IF}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        he_so_anh_huong_IF: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    THỜI GIAN ĐĂNG
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={form.thoi_gian_dang_bai}
                    onChange={(e) =>
                      setForm({ ...form, thoi_gian_dang_bai: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">LĨNH VỰC</Form.Label>
                  <Form.Control
                    value={form.linh_vuc}
                    onChange={(e) =>
                      setForm({ ...form, linh_vuc: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">XUẤT XỨ</Form.Label>
                  <Form.Control
                    value={form.xuat_xu}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        xuat_xu: e.target.value ? parseInt(e.target.value) : 0,
                      })
                    }
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
          <Button variant="primary" onClick={handleSave}>
            {editing ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
