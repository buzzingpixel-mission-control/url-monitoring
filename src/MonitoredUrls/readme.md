# Flow

## Checking

### Schedule

`\MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\AddUrlsToQueueAction` runs every minute on the scheduler (`\BuzzingPixel\Scheduler\Frequency::ALWAYS`) and adds all active URLs to the queue to be checked if the monitoring queue is empty (we don't want to get behind and get backed up) `\MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckUrlJob`.

### Queue

Once the CheckUrlJob is in the queue, it gets the URL by ID from persistence, and it gets the most recent incident. Then it uses a pipeline to check the URL, the processes the results of the check.

The check part uses Guzzle to check the URL and determine its status.

Process results adds an incident if the status of the URL has changed and it updates the status of the URL in the persistence if needed. Then it updates the time the URL was last checked at.

## Notifications

### Schedule

Incidents are added to persistence with a `null` `last_notification_at` value in the above steps. `\MissionControlUrlMonitoring\MonitoredUrls\Notifications\CheckNotificationsAction` runs every minute and. It does two things:

1. It gets any incidents that are not in a pending state that have a null value on `last_notification_at` and adds it to the queue for sending a notification unless it's already in the queue.
2. It gets any `down` incidents that have had a notification already but have passed a threshold of time to send a reminder and adds it to the queue for sending a notification.

The job that gets added to the queue for notifications is `\MissionControlUrlMonitoring\MonitoredUrls\Notifications\SendNotificationJob`

### Queue

The `\MissionControlUrlMonitoring\MonitoredUrls\Notifications\SendNotificationJob` gets the incident from persistence by ID and sends a notification with configured adapters UNLESS there is no previous incident (new URL) and the URL is in UP status.

Regardless, `last_notification_at` gets updated to current time.

## Logic tree

- URL added to queue for checking on schedule
    - From queue: URL is checked and if status is different from previous, add an incident
- Notification check is run on schedule
    - If an incident's `last_notification_at` is null, it is added to the queue for a notification
    - If a `down` incident is the most recent incident and has passed a time threshold since last notification, it is added to the queue for a notification
    - The queue job checks if the incident is the first for a URL and an UP event. If it is, no notification is sent. Otherwise a notifications is sent
