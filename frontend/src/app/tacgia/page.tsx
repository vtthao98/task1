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
  User,
  Building2,
  Hash,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import CrudToolbar from "../components/CrudToolbar";

// Cấu hình URL backend cho tác giả
const API_URL = "http://localhost:5000/tac-gia";

type TacGia = {
  id?: number;
  ten: string;
  gioi_tinh: string;
  don_vi_id: number;
  thuoc_dhdn: boolean;
  trinh_do: string;
};

const emptyAuthor: TacGia = {
  ten: "",
  gioi_tinh: "Nam", // Giá trị mặc định
  don_vi_id: 0,
  thuoc_dhdn: false,
  trinh_do: "",
};

export default function TacGiaPage() {
  const [rows, setRows] = useState<TacGia[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<TacGia | null>(null);
  const [form, setForm] = useState<TacGia>(emptyAuthor);

  // --- API OPERATIONS ---

  const fetchData = useCallback(async (keyword: string = "") => {
    setLoading(true);
    try {
      const url = keyword
        ? `${API_URL}/search?key=${keyword}`
        : `${API_URL}/all`;

      const res = await axios.get(url);

      // Xử lý dữ liệu trả về từ NestJS
      setRows(res.data.data || res.data || []);
    } catch (error) {
      console.error("Lỗi kết nối Frontend - Backend:", error);
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
        // Ưu tiên res.data.data nếu backend trả về dạng object { data: [...] }
        const data = res.data.data || res.data;

        setEditing(data);
        // Ràng buộc dữ liệu tránh lỗi Uncontrolled Input
        setForm({
          ten: data.ten ?? "",
          gioi_tinh: data.gioi_tinh ?? "Nam",
          don_vi_id: data.don_vi_id ?? "",
          thuoc_dhdn: data.thuoc_dhdn ?? false,
          trinh_do: data.trinh_do ?? "",
        });
      } catch (error) {
        alert("Không thể lấy thông tin tác giả");
      }
    } else {
      setEditing(null);
      setForm(emptyAuthor);
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.ten.trim()) return alert("Vui lòng nhập tên tác giả!");
    try {
      const object = {
        don_vi_id: parseInt(form.don_vi_id + ""),
        gioi_tinh: form.gioi_tinh || null,
        ten: form.ten,
        thuoc_dhdn: form.thuoc_dhdn,
        trinh_do: form.trinh_do || null,
      };
      if (editing) {
        // Cập nhật dùng id làm ID
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
    if (confirm("Xác nhận xóa tác giả này?")) {
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
        title="Danh mục Tác giả"
        search={search}
        onSearch={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <Card className="shadow-sm border-0 mt-3">
        <Table hover responsive className="align-middle mb-0 text-nowrap">
          <thead className="bg-light">
            <tr>
              <th style={{ width: 100 }}>
                <div className="d-flex align-items-center gap-1">
                  <Hash size={16} /> Mã TG
                </div>
              </th>
              <th>
                <div className="d-flex align-items-center gap-1">
                  <User size={16} /> Tên tác giả
                </div>
              </th>
              <th>Giới tính</th>
              <th>
                <div className="d-flex align-items-center gap-1">
                  <Building2 size={16} /> Đơn vị
                </div>
              </th>
              <th>
                <div className="d-flex align-items-center gap-1">
                  <GraduationCap size={16} /> Trình độ
                </div>
              </th>
              <th className="text-center">Thuộc ĐHĐN</th>
              <th style={{ width: 150 }} className="text-end">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-5">
                  <Spinner animation="border" variant="info" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-muted">
                  Chưa có dữ liệu tác giả.
                </td>
              </tr>
            ) : (
              rows.map((x) => (
                <tr key={x.id}>
                  <td className="text-muted fw-bold">{x.id}</td>
                  <td className="fw-semibold text-dark">{x.ten}</td>
                  <td>{x.gioi_tinh}</td>
                  <td>{x.don_vi_id}</td>
                  <td>{x.trinh_do}</td>
                  <td className="text-center">
                    {x.thuoc_dhdn ? (
                      <Badge bg="success">
                        <CheckCircle2 size={14} className="me-1" /> Có
                      </Badge>
                    ) : (
                      <Badge bg="secondary">Không</Badge>
                    )}
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
          <Modal.Title className="fw-bold">
            {editing ? "Sửa thông tin tác giả" : "Thêm tác giả mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    TÊN TÁC GIẢ
                  </Form.Label>
                  <Form.Control
                    value={form.ten}
                    onChange={(e) => setForm({ ...form, ten: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn A..."
                    autoFocus
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    GIỚI TÍNH
                  </Form.Label>
                  <Form.Select
                    value={form.gioi_tinh}
                    onChange={(e) =>
                      setForm({ ...form, gioi_tinh: e.target.value })
                    }
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    TRÌNH ĐỘ
                  </Form.Label>
                  <Form.Control
                    value={form.trinh_do}
                    onChange={(e) =>
                      setForm({ ...form, trinh_do: e.target.value })
                    }
                    placeholder="Ví dụ: Tiến sĩ, Thạc sĩ..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">
                    ĐƠN VỊ
                  </Form.Label>
                  <Form.Control
                    value={form.don_vi_id}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        don_vi_id: e.target.value
                          ? parseInt(e.target.value)
                          : 0,
                      })
                    }
                    placeholder="Nhập tên đơn vị công tác..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3 mt-2">
              <Form.Check
                type="switch"
                id="thuoc-dhdn-switch"
                label="Thuộc Đại học Đà Nẵng (ĐHĐN)"
                checked={form.thuoc_dhdn}
                onChange={(e) =>
                  setForm({ ...form, thuoc_dhdn: e.target.checked })
                }
                className="fw-semibold text-primary"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" onClick={() => setShow(false)}>
            Hủy bỏ
          </Button>
          <Button
            variant="info"
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
