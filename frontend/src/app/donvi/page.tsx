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
import { Edit3, Trash2, Plus, Search, Building2, Hash } from "lucide-react";
import CrudToolbar from "../components/CrudToolbar";

// Cấu hình URL backend
const API_URL = "http://localhost:5000/don-vi";

type DonVi = {
  id?: number;
  ten: string;
};

const emptyDept: DonVi = {
  ten: "",
};

export default function DonViPage() {
  const [rows, setRows] = useState<DonVi[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<DonVi | null>(null);
  const [form, setForm] = useState<DonVi>(emptyDept);

  // --- API OPERATIONS ---

  const fetchData = useCallback(async (keyword: string = "") => {
    setLoading(true);
    try {
      const url = keyword
        ? `${API_URL}/search?key=${keyword}`
        : `${API_URL}/all`;

      const res = await axios.get(url);

      console.log(res);
      setRows(res.data.data);
    } catch (error) {
      console.error("Lỗi kết nối Frontend - Backend:", error);
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
        setEditing(res.data.data);
        setForm(res.data.data);
      } catch (error) {
        alert("Không thể lấy thông tin đơn vị");
      }
    } else {
      setEditing(null);
      setForm(emptyDept);
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.ten.trim()) return alert("Vui lòng nhập tên đơn vị!");
    try {
      if (editing) {
        console.log(editing);
        await axios.patch(`${API_URL}/update/${editing.id}`, {
          ten: form.ten,
        });
      } else {
        await axios.post(`${API_URL}/create`, form);
      }
      fetchData();
      setShow(false);
    } catch (error) {
      alert("Lưu dữ liệu thất bại");
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (
      confirm(
        "Xác nhận xóa đơn vị này? Lưu ý: Việc xóa đơn vị có thể ảnh hưởng đến dữ liệu nhân sự liên quan.",
      )
    ) {
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
        title="Danh mục Đơn vị"
        search={search}
        onSearch={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th style={{ width: 100 }}>
                    <div className="d-flex align-items-center gap-1">
                      <Hash size={16} /> Mã
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-1">
                      <Building2 size={16} /> Tên đơn vị
                    </div>
                  </th>
                  <th style={{ width: 150 }} className="text-end">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-5">
                      <Spinner animation="border" variant="info" />
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted">
                      Chưa có dữ liệu đơn vị.
                    </td>
                  </tr>
                ) : (
                  rows.map((x) => (
                    <tr key={x.id}>
                      <td className="text-muted fw-bold">{x.id}</td>
                      <td className="fw-semibold text-dark">{x.ten}</td>
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
        </Col>
      </Row>

      {/* Modal Form */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editing ? "Sửa tên đơn vị" : "Thêm đơn vị mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">
                TÊN ĐƠN VỊ
              </Form.Label>
              <Form.Control
                size="lg"
                value={form.ten}
                onChange={(e) => setForm({ ...form, ten: e.target.value })}
                placeholder="Ví dụ: Khoa Công nghệ thông tin..."
                autoFocus
              />
              <Form.Text className="text-muted">
                Tên đơn vị nên là tên chính thức dùng trong các văn bản.
              </Form.Text>
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
