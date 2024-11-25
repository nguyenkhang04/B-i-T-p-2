import React, { useState, useEffect } from 'react';
import { notification } from 'antd';

import { fetchReminders, saveReminder } from './reminderService';
import { Reminder } from './type';
import ReminderForm from './component/ReminderForm';
import ReminderList from './component/RenminderList';

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const handleAddReminder = async (newReminder: Reminder) => {
    await saveReminder(newReminder); 
    setReminders((prevReminders) => [...prevReminders, newReminder]); 
  };

  useEffect(() => {
    const loadReminders = async () => {
      const fetchedReminders = await fetchReminders(); 
      setReminders(fetchedReminders);
    };

    loadReminders();
  }, []);

  useEffect(() => {
    reminders.forEach((reminder) => {
      if (reminder.isToday) {
        notification.open({
          message: 'Nhắc Nhở!',
          description: reminder.content,
        });
      }
    });
  }, [reminders]);

  return (
    <div style={{ padding: 20, display: 'flex', gap: '20px' }}>
      <div style={{ width: '300px' }}>
        <h2>Thêm Nhắc Nhở</h2>
        <ReminderForm onAddReminder={handleAddReminder} />
      </div>

      <div style={{ flex: 1 }}>
        <h2>Danh Sách Nhắc Nhở</h2>
        <ReminderList reminders={reminders} />
      </div>
    </div>
  );
};

export default App;
