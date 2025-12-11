import { Bell, Check, Trash2 } from 'lucide-react';

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

export function Notifications({
  notifications,
  onMarkAsRead,
}: {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}) {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">
          {unreadNotifications.length} unread notification{unreadNotifications.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">Unread</h2>
          <div className="space-y-3">
            {unreadNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        </div>
      )}

      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <div>
          <h2 className="text-gray-900 mb-4">Read</h2>
          <div className="space-y-3">
            {readNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        </div>
      )}

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No notifications yet</p>
        </div>
      )}
    </div>
  );
}

function NotificationCard({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        notification.read
          ? 'bg-white border-gray-200'
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          notification.read ? 'bg-gray-100' : 'bg-blue-100'
        }`}>
          <Bell className={`w-5 h-5 ${notification.read ? 'text-gray-600' : 'text-blue-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 mb-1">{notification.title}</h3>
          <p className="text-gray-600">{notification.message}</p>
        </div>
        <div className="flex gap-2">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="Mark as read"
            >
              <Check className="w-5 h-5" />
            </button>
          )}
          <button
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
