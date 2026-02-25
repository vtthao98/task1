"use client";

import { Form, Button } from "react-bootstrap";

export default function CrudToolbar({
  title,
  search,
  onSearch,
  onAdd,
}: {
  title: string;
  search: string;
  onSearch: (v: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="d-flex align-items-center justify-content-between gap-3 mb-3 flex-wrap">
      <h4 className="m-0">{title}</h4>

      <div className="d-flex gap-2 align-items-center">
        <Form.Control
          style={{ minWidth: 260 }}
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button onClick={onAdd}>+ Thêm</Button>
      </div>
    </div>
  );
}
