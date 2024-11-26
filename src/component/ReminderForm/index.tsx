import React, { useState } from "react";
import { Input, DatePicker, Button, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Reminder } from "../../type";
import "./styles.scss";

interface Props {
  onAddReminder: (reminder: Reminder) => void;
}

const ReminderForm: React.FC<Props> = ({ onAddReminder }) => {
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const today = dayjs().startOf("day");

  const handleSave = async () => {
    if (!content || !date) {
      message.error("Bạn chưa nhập Nội Dung và Ngày Nhắc!");
      return;
    }

    if (date.isBefore(today)) {
      message.error("Không được chọn ngày trước ngày hiện tại!");
      return;
    }

    const response = await fetch("http://localhost:8888/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        date: date.format("DD/MM/YYYY"),
        isToday: date.isSame(today, "day"),
      }),
    });

    if (!response.ok) {
      message.error("Đã xảy ra lỗi khi lưu nhắc nhở!");
      return;
    }

    const newReminder = await response.json();

    onAddReminder(newReminder);

    setContent("");
    setDate(null);
  };

  return (
    <div className="reminder-form">
      <Input
        className="input"
        placeholder="Nhập nội dung nhắc nhở"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <DatePicker
        className="date-picker"
        value={date}
        onChange={(value) => setDate(value)}
      />
      <Button className="save-button" type="primary" onClick={handleSave}>
        Lưu Ngày
      </Button>
    </div>
  );
};

export default ReminderForm;
