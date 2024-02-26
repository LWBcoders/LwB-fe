import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import styles from "../../../css/Calendar.module.css";
import { createEvent, getEvents, deleteEvent, updateEvent } from "../../../api";

const TeacherCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [notification, setNotification] = useState("");
  const [currentEvent, setCurrentEvent] = useState(null);
  const calendarRef = useRef(null);

  const clearNotification = () => {
    setNotification("");
  };

  const handleDateSelect = async (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;

    if (calendarApi.view.type === "dayGridMonth") {
      calendarApi.changeView("listDay", selectInfo.startStr);
      return;
    }

    const title = prompt("Please enter a new title for your event");
    const url = prompt("Please enter url");

    const newEvent = {
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      url,
    };

    try {
      const createdEvent = await createEvent(newEvent);
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    const event = clickInfo.event;

    if (event.url && clickInfo.jsEvent.target.tagName !== "BUTTON") {
      const fullUrl = event.url.startsWith("http")
        ? event.url
        : `http://${event.url}`;
      window.open(fullUrl, "_blank");
    } else {
      // Set the current event being edited
      setCurrentEvent(event);

      // Display the event details modal when an event is clicked
      setEventData(event);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditEvent = async (clickInfo) => {
    if (!clickInfo) {
      console.error("Error editing event: No event provided in currentEvent");
      return;
    }

    const title = prompt(
      "Please enter a new title for your event",
      clickInfo.title
    );
    const url = prompt("Please enter a new URL for your event", clickInfo.url);

    if (title || url) {
      const updatedData = {
        title: title || clickInfo.title,
        url: url || clickInfo.url,
      };

      try {
        const eventId = clickInfo.event.extendedProps._id;
        await updateEvent(eventId, updatedData);
        setEvents((prevEvents) =>
          prevEvents.map((ev) =>
            ev._id === eventId ? { ...ev, ...updatedData } : ev
          )
        );
        setNotification("Event updated successfully!");
      } catch (error) {
        console.error("Error updating event:", error);
        setNotification("Error updating event");
      }
      setTimeout(() => {
        clearNotification();
      }, 1500);
    }
  };

  const handleDeleteEvent = async (clickInfo) => {
    try {
      if (!clickInfo || !clickInfo.event) {
        console.error("Error deleting event: No event provided in clickInfo");
        return;
      }

      const eventId = clickInfo.event.extendedProps._id;
      await deleteEvent(eventId);
      setEvents((prevEvents) => prevEvents.filter((ev) => ev._id !== eventId));
      setNotification("Event removed successfully!");

      setTimeout(() => {
        clearNotification();
      }, 1500);
    } catch (error) {
      console.error("Error deleting event:", error);
      setNotification("Error deleting event");
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

    if (isDayView || isListView) {
      if (eventElement) {
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        eventElement.appendChild(editButton);
        eventElement.appendChild(deleteButton);

        // Add click listeners to the edit and delete buttons
        editButton.addEventListener("click", () => handleEditEvent(info));
        deleteButton.addEventListener("click", () => handleDeleteEvent(info));
      }
    }
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
      {showButtons && (
        <div>
          <button
            className="edit-event-button"
            onClick={() => handleEditEvent(currentEvent)}
          >
            Edit
          </button>
          <button
            className="delete-event-button"
            onClick={() => handleDeleteEvent({ event: clickInfo.event })}
          >
            Delete
          </button>
        </div>
      )}
      <div className="delete-notification">
        {notification && <div>{notification}</div>}
      </div>
    </div>
  );
};

export default TeacherCalendar;
