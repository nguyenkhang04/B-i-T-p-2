import React from "react";
import ReminderItem from "../ReminderItem";
import { Reminder } from "../../type";
import "./styles.scss";

interface Props {
  reminders: Reminder[];
  onDeleteReminder: (index: number) => void;
}

const ReminderList: React.FC<Props> = ({ reminders, onDeleteReminder }) => {
  return (
    <div className="reminder-list">
      {reminders.map((reminder, index) => (
        <ReminderItem
          key={index}
          reminder={reminder}
          onDelete={() => onDeleteReminder(index)}
        />
      ))}
    </div>
  );
};

export default ReminderList;
