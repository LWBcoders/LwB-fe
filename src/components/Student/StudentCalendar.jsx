import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import styles from "../../../css/Calendar.module.css";
import { getEvents } from "../../../api";

const StudentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [notification, setNotification] = useState("");
  const [currentEvent, setCurrentEvent] = useState(null);
  const calendarRef = useRef(null);

  const handleDateSelect = async (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;

    if (calendarApi.view.type === "dayGridMonth") {
      calendarApi.changeView("listDay", selectInfo.startStr);
      return;
    }
  };

  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    const event = clickInfo.event;

    if (event.url && clickInfo.jsEvent.target.tagName !== "BUTTON") {
      const fullUrl = event.url.startsWith("http")
        ? event.url
        : `http://${event.url}/`;
      window.open(fullUrl, "_blank");
    } else {
      // Display the event details modal when an event is clicked
      setEventData(event);
      setShowModal(true);
    }
  };

  const eventDidMount = (info) => {
    const eventElement = info.el;
    const calendarApi = info.view.calendar;
    const isDayView =
      calendarApi.view.type === "dayGridDay" ||
      calendarApi.view.type === "timeGridDay";
    const isListView =
      calendarApi.view.type === "listDay" ||
      calendarApi.view.type === "listWeek";
  };

  const viewDidMount = (info) => {
    setShowButtons(
      info.view.type === "dayGridDay" || info.view.type === "timeGridDay"
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [events]);

  return (
    <div className={styles.calendar}>
      <div></div>
      <FullCalendar
        events={events}
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDidMount={eventDidMount}
        viewDidMount={viewDidMount}
      />
    </div>
  );
};

export default StudentCalendar;
