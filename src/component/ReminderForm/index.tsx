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

  const handleSave = () => {
    if (!content || !date) {
      message.error("Bạn chưa nhập nội dung và ngày nhắc nhở!");
      return;
    }

    if (date.isBefore(today)) {
      message.error("Không được chọn ngày trước ngày hiện tại!");
      return;
    }

    const newReminder: Reminder = {
      id: "",
      content,
      date: date.format("DD/MM/YYYY"),
      isToday: date.isSame(today, "day"),
    };

    onAddReminder(newReminder);
    setContent("");
    setDate(null);
    message.success("Nhắc nhở đã được thêm!");
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
        Lưu Nhắc Nhở
      </Button>
    </div>
  );
};

export default ReminderForm;
