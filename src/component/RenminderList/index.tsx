import React from "react";
import ReminderItem from "../ReminderItem";
import { Reminder } from "../../type";
import "./styles.scss";

interface Props {
  reminders: Reminder[];
}

const ReminderList: React.FC<Props> = ({ reminders }) => {
  return (
    <div className="reminder-list">
      {reminders.map((reminder, index) => (
        <ReminderItem key={index} reminder={reminder} />
      ))}
    </div>
  );
};

export default ReminderList;
