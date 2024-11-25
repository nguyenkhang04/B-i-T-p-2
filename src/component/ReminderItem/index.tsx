import React from "react";
import { Reminder } from "../../type";
import "./styles.scss";

interface Props {
  reminder: Reminder;
}

const ReminderItem: React.FC<Props> = ({ reminder }) => {
  return (
    <div className={`reminder-item ${reminder.isToday ? "is-today" : ""}`}>
      <p className="date">
        <strong>Ngay:</strong>
      </p>{" "}
      {reminder.date}
      <p className="content">
        <strong>Noi dung:</strong>
      </p>{" "}
      {reminder.content}
    </div>
  );
};

export default ReminderItem;
