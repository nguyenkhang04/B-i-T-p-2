import React from "react";
import { Reminder } from "../../type";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";

interface Props {
  reminder: Reminder;
  onDelete: () => void;
}

const ReminderItem: React.FC<Props> = ({ reminder, onDelete }) => {
  return (
    <div className={`reminder-item ${reminder.isToday ? "is-today" : ""}`}>
      <p className="date">
        <strong>Ngay:</strong> {reminder.date}
      </p>
      <p className="content">
        <strong>Noi dung:</strong> {reminder.content}
      </p>
      <DeleteOutlined className="delete-icon" onClick={onDelete} />
    </div>
  );
};

export default ReminderItem;
