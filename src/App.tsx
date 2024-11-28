import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Reminder } from "./type";
import ReminderList from "./component/RenminderList";
import ReminderForm from "./component/ReminderForm";
import dayjs from "dayjs";

const fetchReminders = async (): Promise<Reminder[]> => {
  const response = await fetch(
    `http://localhost:8888/reminders?timestamp=${Date.now()}`
  );
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

const deleteReminder = async (id: string): Promise<void> => {
  await fetch(`http://localhost:8888/reminders/${id}`, {
    method: "DELETE",
  });
};

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const loadReminders = async () => {
    const fetchedReminders = await fetchReminders();

    if (!fetchedReminders || fetchedReminders.length === 0) {
      setReminders([]);
      return;
    }

    const sortedReminders = fetchedReminders.sort((a, b) =>
      dayjs(a.date, "DD/MM/YYYY").isAfter(dayjs(b.date, "DD/MM/YYYY")) ? 1 : -1
    );
    setReminders(sortedReminders);
  };

  const handleAddReminder = async (newReminder: Reminder) => {
    const isDuplicate = reminders.some(
      (reminder) =>
        reminder.content === newReminder.content &&
        reminder.date === newReminder.date
    );

    if (isDuplicate) {
      notification.warning({
        message: "Nhắc Nhở Trùng Lặp!",
        description: "Reminder with this content and date already exists.",
      });
      return;
    }

    const reminderWithId = {
      ...newReminder,
      id: uuidv4(),
    };

    try {
      const savedReminder = await saveReminder(reminderWithId);

      setReminders((prevReminders) => {
        const sortedReminders = [...prevReminders, savedReminder].sort((a, b) =>
          dayjs(a.date, "DD/MM/YYYY").isAfter(dayjs(b.date, "DD/MM/YYYY"))
            ? 1
            : -1
        );
        return sortedReminders;
      });
    } catch (error) {
      console.error("Lỗi khi lưu reminder:", error);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      await deleteReminder(id);
      setReminders((prevReminders) =>
        prevReminders.filter((reminder) => reminder.id !== id)
      );
    } catch (error) {
      console.error("Lỗi khi xóa reminder:", error);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  useEffect(() => {
    if (reminders.length === 0) return;

    reminders.forEach((reminder) => {
      if (reminder.isToday) {
        notification.open({
          message: "Nhắc Nhở!",
          description: reminder.content,
          placement: "top",
          style: {
            textAlign: "center",
          },
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
