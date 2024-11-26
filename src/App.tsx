import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { Reminder } from "./type";
import ReminderList from "./component/RenminderList";
import ReminderForm from "./component/ReminderForm";

const fetchReminders = async (): Promise<Reminder[]> => {
  const response = await fetch("http://localhost:8888/reminders");
  const data = await response.json();
  return data;
};

const saveReminder = async (newReminder: Reminder): Promise<Reminder> => {
  const response = await fetch("http://localhost:8888/reminders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReminder),
  });
  const savedReminder = await response.json();
  return savedReminder;
};

const deleteReminder = async (id: number): Promise<void> => {
  await fetch(`http://localhost:8888/reminders/${id}`, {
    method: "DELETE",
  });
};

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const loadReminders = async () => {
    const fetchedReminders = await fetchReminders();
    setReminders(fetchedReminders);
  };

  const handleAddReminder = async (newReminder: Reminder) => {
    const savedReminder = await saveReminder(newReminder);
    setReminders((prevReminders) => [...prevReminders, savedReminder]);
  };

  const handleDeleteReminder = async (index: number) => {
    const reminderToDelete = reminders[index];
    await deleteReminder(reminderToDelete.id);
    loadReminders();
  };

  useEffect(() => {
    loadReminders();
  }, []);

  useEffect(() => {
    reminders.forEach((reminder) => {
      if (reminder.isToday) {
        notification.open({
          message: "Nhắc Nhở!",
          description: reminder.content,
        });
      }
    });
  }, [reminders]);

  return (
    <div style={{ padding: 20, display: "flex", gap: "20px" }}>
      <div style={{ width: "300px" }}>
        <h2>Thêm Nhắc Nhở</h2>
        <ReminderForm onAddReminder={handleAddReminder} />
      </div>

      <div style={{ flex: 1 }}>
        <h2>Danh Sách Nhắc Nhở</h2>
        <ReminderList
          reminders={reminders}
          onDeleteReminder={handleDeleteReminder}
        />
      </div>
    </div>
  );
};

export default App;
