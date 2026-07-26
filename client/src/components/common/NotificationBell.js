
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiBell } from "react-icons/fi";
import {
  getUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../redux/api/index";

const formatTime = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleString();
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications]
  );

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await getUserNotifications();
      setNotifications(data?.result || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((item) =>
          item._id === notificationId ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error("Failed to mark notification:", error);
    }
  };

  const onReadAll = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all notifications:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 rounded-xl hover:bg-[#0B1F3A] hover:text-white transition-all duration-200"
      >
        <FiBell size={18} />
        {unreadCount > 0 ? (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-red-500 rounded-full flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-30 w-80 mt-3 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-[#0B1F3A]">Notifications</h3>
            <button
              type="button"
              onClick={onReadAll}
              className="text-xs font-medium text-[#0B1F3A] hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading ? <p className="px-4 py-4 text-sm text-gray-500">Loading...</p> : null}
            {!loading && notifications.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-500">No notifications yet.</p>
            ) : null}
            {!loading && notifications.length > 0
              ? notifications.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => onRead(item._id)}
                    className={`w-full px-4 py-3 text-left border-b border-gray-50 hover:bg-gray-50 ${
                      item.isRead ? "bg-white" : "bg-[#F5FAFF]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#0B1F3A]">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-600">{item.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-400">{formatTime(item.createdAt)}</span>
                      <span
                        className={`text-[11px] font-medium ${
                          item.isRead ? "text-gray-400" : "text-[#0B1F3A]"
                        }`}
                      >
                        {item.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                  </button>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationBell;
