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
  Hash,
  Calendar,
  Shield,
  FileSignature,
  Building,
  User,
} from "lucide-react";
import CrudToolbar from "../components/CrudToolbar";

// 1. Cấu hình đúng URL của NestJS cho Tài sản (Sở hữu trí tuệ)
const API_URL = "http://localhost:5000/tai-san";

// 2. Cấu trúc dữ liệu có dấu gạch dưới (_)
type TaiSan = {
  id?: number;
  ten: string;
  loai_cong_trinh: string;
  ngay_nop_don: string;
  thoi_gian_chap_nhan_don: string;
  so_quyet_dinh: string;
  ngay_cap_bang: string;
  noi_nop_don: string;
  chu_don: number;
  xuat_phat_tu: number;
  gioi_thieu_tom_tat: string;
};

// Khởi tạo giá trị rỗng (tránh lỗi undefined cho input)
const emptyAsset: TaiSan = {
  ten: "",
  loai_cong_trinh: "",
  ngay_nop_don: "",
  thoi_gian_chap_nhan_don: "",
  so_quyet_dinh: "",
  ngay_cap_bang: "",
  noi_nop_don: "",
  chu_don: 1,
  xuat_phat_tu: 1,
  gioi_thieu_tom_tat: "",
};

export default function TaiSanPage() {
  const [rows, setRows] = useState<TaiSan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<TaiSan | null>(null);
  const [form, setForm] = useState<TaiSan>(emptyAsset);

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
          loai_cong_trinh: data.loai_cong_trinh ?? "",
          ngay_nop_don: data.ngay_nop_don ?? "",
          thoi_gian_chap_nhan_don: data.thoi_gian_chap_nhan_don ?? "",
          so_quyet_dinh: data.so_quyet_dinh ?? "",
          ngay_cap_bang: data.ngay_cap_bang ?? "",
          noi_nop_don: data.noi_nop_don ?? "",
          chu_don: data.chu_don ?? "",
          xuat_phat_tu: data.xuat_phat_tu ?? "",
          gioi_thieu_tom_tat: data.gioi_thieu_tom_tat ?? "",
        });
      } catch (error) {
        alert("Không thể lấy thông tin tài sản");
      }
    } else {
      setEditing(null);
      setForm(emptyAsset);
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (!form.ten.trim())
      return alert("Vui lòng nhập tên công trình / tài sản!");
    try {
      const object = {
        ten: form.ten,
        loai_cong_trinh: form.loai_cong_trinh || null,
        ngay_nop_don: form.ngay_nop_don || null,
        thoi_gian_chap_nhan_don: form.thoi_gian_chap_nhan_don || null,
        so_quyet_dinh: form.so_quyet_dinh || null,
        ngay_cap_bang: form.ngay_cap_bang || null,
        noi_nop_don: form.noi_nop_don || null,
        chu_don: form.chu_don,
        xuat_phat_tu: form.xuat_phat_tu,
        gioi_thieu_tom_tat: form.gioi_thieu_tom_tat || null,
      };
      if (editing) {
        console.log("Cập nhật:", form);
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
    if (confirm("Xác nhận xóa tài sản sở hữu trí tuệ này?")) {
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
        title="Quản lý Tài sản / Sở hữu trí tuệ"
        search={search}
        onSearch={setSearch}
        onAdd={() => handleOpenModal()}
      />

      <Card className="shadow-sm border-0 mt-3">
        <Table hover responsive className="align-middle mb-0 text-nowrap">
          <thead className="bg-light">
            <tr>
              <th style={{ width: 90 }}>
                <Hash size={16} /> Mã CT
              </th>
              <th>
                <Shield size={16} /> Tên & Loại công trình
              </th>
              <th>
                <User size={16} /> Chủ đơn & Nơi nộp
              </th>
              <th>
                <Calendar size={16} /> Ngày nộp / Cấp bằng
              </th>
              <th>
                <FileSignature size={16} /> Số quyết định
              </th>
              <th className="text-end">Thao tác</th>
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
                  Chưa có dữ liệu tài sản / công trình.
                </td>
              </tr>
            ) : (
              rows.map((x) => (
                <tr key={x.id}>
                  <td className="text-muted fw-bold">{x.id}</td>
                  <td style={{ maxWidth: "300px", whiteSpace: "normal" }}>
                    <div className="fw-bold text-dark">{x.ten}</div>
                    <Badge bg="secondary" className="mt-1 fw-normal">
                      {x.loai_cong_trinh}
                    </Badge>
                  </td>
                  <td>
                    <div className="fw-semibold text-primary">{x.chu_don}</div>
                    <small className="text-muted">
                      <Building size={14} className="me-1 d-inline" />
                      {x.noi_nop_don}
                    </small>
                  </td>
                  <td>
                    <div className="small">
                      Nộp:{" "}
                      <span className="fw-medium">
                        {x.ngay_nop_don || "---"}
                      </span>
                    </div>
                    <div className="small text-success mt-1">
                      Cấp:{" "}
                      <span className="fw-medium">
                        {x.ngay_cap_bang || "---"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="fw-medium text-dark">
                      {x.so_quyet_dinh || "---"}
                    </span>
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
      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-success">
            {editing ? "Sửa thông tin Tài sản" : "Thêm Tài sản mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    TÊN CÔNG TRÌNH / TÀI SẢN
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={form.ten}
                    onChange={(e) => setForm({ ...form, ten: e.target.value })}
                    placeholder="Nhập tên tài sản sở hữu trí tuệ..."
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    LOẠI CÔNG TRÌNH
                  </Form.Label>
                  <Form.Control
                    value={form.loai_cong_trinh}
                    onChange={(e) =>
                      setForm({ ...form, loai_cong_trinh: e.target.value })
                    }
                    placeholder="VD: Bằng độc quyền sáng chế..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">CHỦ ĐƠN</Form.Label>
                  <Form.Control
                    value={form.chu_don}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        chu_don: e.target.value ? parseInt(e.target.value) : 0,
                      })
                    }
                    placeholder="Tên cá nhân/tổ chức đứng tên..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">NƠI NỘP ĐƠN</Form.Label>
                  <Form.Control
                    value={form.noi_nop_don}
                    onChange={(e) =>
                      setForm({ ...form, noi_nop_don: e.target.value })
                    }
                    placeholder="Cơ quan tiếp nhận..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    NGÀY NỘP ĐƠN
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={form.ngay_nop_don}
                    onChange={(e) =>
                      setForm({ ...form, ngay_nop_don: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    TG CHẤP NHẬN ĐƠN
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={form.thoi_gian_chap_nhan_don}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        thoi_gian_chap_nhan_don: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    NGÀY CẤP BẰNG
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={form.ngay_cap_bang}
                    onChange={(e) =>
                      setForm({ ...form, ngay_cap_bang: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    SỐ QUYẾT ĐỊNH
                  </Form.Label>
                  <Form.Control
                    value={form.so_quyet_dinh}
                    onChange={(e) =>
                      setForm({ ...form, so_quyet_dinh: e.target.value })
                    }
                    placeholder="Số quyết định cấp bằng..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    XUẤT PHÁT TỪ
                  </Form.Label>
                  <Form.Control
                    value={form.xuat_phat_tu}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        xuat_phat_tu: e.target.value
                          ? parseInt(e.target.value)
                          : 0,
                      })
                    }
                    placeholder="Nguồn gốc hình thành (Đề tài nào...)"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">
                GIỚI THIỆU TÓM TẮT
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={form.gioi_thieu_tom_tat}
                onChange={(e) =>
                  setForm({ ...form, gioi_thieu_tom_tat: e.target.value })
                }
                placeholder="Mô tả tóm tắt về nội dung công trình..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" onClick={() => setShow(false)}>
            Hủy bỏ
          </Button>
          <Button variant="success" onClick={handleSave}>
            {editing ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
