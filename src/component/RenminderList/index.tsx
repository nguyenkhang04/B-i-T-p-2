import React from "react";
import ReminderItem from "../ReminderItem";
import { Reminder } from "../../type";
import "./styles.scss";

interface Props {
  reminders: Reminder[];
  onDeleteReminder: (id: string) => void;
}

const ReminderList: React.FC<Props> = ({ reminders, onDeleteReminder }) => {
  return (
    <div className="reminder-list">
      {reminders.map((reminder) => (
        <ReminderItem
          key={reminder.id}
          reminder={reminder}
          onDelete={() => onDeleteReminder(reminder.id)}
        />
      ))}
    </div>
  );
};

export default ReminderList;
