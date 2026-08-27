// ==========================================
// OUR DATE PLANNER
// ==========================================

let currentDate = new Date();
let selectedDate = null;

let events = [];


// ==========================================
// GET SUPABASE EVENTS
// ==========================================

async function loadEvents() {

    const { data, error } = await supabase
        .from("scheduled_dates")
        .select("*")
        .order("date", { ascending: true });

    if (error) {

        console.error("Could not load dates:", error);

        alert("Couldn't load the date planner.");

        return;
    }

    events = data || [];

    renderCalendar();

    renderUpcoming();
}


// ==========================================
// CALENDAR
// ==========================================

function renderCalendar() {

    const calendar = document.getElementById("calendar");

    const monthYear = document.getElementById("monthYear");

    calendar.innerHTML = "";


    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();


    const monthName = currentDate.toLocaleString(
        "default",
        {
            month: "long"
        }
    );


    monthYear.textContent =
        `${monthName} ${year}`;


    // First day of month

    const firstDay =
        new Date(year, month, 1).getDay();


    // Number of days

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    // Empty spaces

    for (let i = 0; i < firstDay; i++) {

        const emptyDay =
            document.createElement("div");

        emptyDay.className =
            "calendar-day empty";

        calendar.appendChild(emptyDay);
    }


    // Actual days

    for (let day = 1; day <= daysInMonth; day++) {

        const cell =
            document.createElement("button");

        cell.className =
            "calendar-day";


        const dateString =
            formatDate(
                new Date(year, month, day)
            );


        cell.innerHTML = `
            <span class="day-number">
                ${day}
            </span>
        `;


        // Check whether this date has events

        const dayEvents =
            events.filter(
                event => event.date === dateString
            );


        if (dayEvents.length > 0) {

            cell.classList.add("has-event");

            const eventDot =
                document.createElement("span");

            eventDot.className =
                "event-dot";

            eventDot.textContent =
                "📖";

            cell.appendChild(eventDot);
        }


        // Today

        const today =
            formatDate(new Date());


        if (dateString === today) {

            cell.classList.add("today");
        }


        // Click

        cell.addEventListener(
            "click",
            () => selectDate(dateString)
        );


        calendar.appendChild(cell);
    }
}


// ==========================================
// SELECT DATE
// ==========================================

function selectDate(dateString) {

    selectedDate = dateString;


    document.getElementById(
        "selectedDate"
    ).textContent =
        formatPrettyDate(dateString);


    const existing =
        events.find(
            event => event.date === dateString
        );


    if (existing) {

        document.getElementById(
            "eventTitle"
        ).value =
            existing.title || "";


        document.getElementById(
            "eventDescription"
        ).value =
            existing.description || "";

    } else {

        document.getElementById(
            "eventTitle"
        ).value = "";


        document.getElementById(
            "eventDescription"
        ).value = "";
    }
}


// ==========================================
// SAVE DATE
// ==========================================

async function saveEvent() {

    if (!selectedDate) {

        alert("Please select a date first.");

        return;
    }


    const title =
        document.getElementById(
            "eventTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "eventDescription"
        ).value.trim();


    if (!title) {

        alert("Give the date a name first.");

        return;
    }


    // Check if date already exists

    const existing =
        events.find(
            event => event.date === selectedDate
        );


    if (existing) {

        const { error } =
            await supabase
                .from("scheduled_dates")
                .update({
                    title: title,
                    description: description
                })
                .eq("id", existing.id);


        if (error) {

            console.error(error);

            alert("Couldn't update the date.");

            return;
        }

    } else {

        const { error } =
            await supabase
                .from("scheduled_dates")
                .insert({
                    date: selectedDate,
                    title: title,
                    description: description
                });


        if (error) {

            console.error(error);

            alert("Couldn't save the date.");

            return;
        }
    }


    alert("Date saved! 📖");

    await loadEvents();
}


// ==========================================
// CLEAR DATE
// ==========================================

async function clearEvent() {

    if (!selectedDate) {

        alert("Select a date first.");

        return;
    }


    const existing =
        events.find(
            event => event.date === selectedDate
        );


    if (!existing) {

        document.getElementById(
            "eventTitle"
        ).value = "";


        document.getElementById(
            "eventDescription"
        ).value = "";

        return;
    }


    if (
        !confirm(
            "Remove this planned date?"
        )
    ) {

        return;
    }


    const { error } =
        await supabase
            .from("scheduled_dates")
            .delete()
            .eq("id", existing.id);


    if (error) {

        console.error(error);

        alert("Couldn't remove the date.");

        return;
    }


    document.getElementById(
        "eventTitle"
    ).value = "";


    document.getElementById(
        "eventDescription"
    ).value = "";


    await loadEvents();
}


// ==========================================
// UPCOMING DATES
// ==========================================

function renderUpcoming() {

    const container =
        document.getElementById(
            "upcomingEvents"
        );


    container.innerHTML = "";


    const today =
        formatDate(new Date());


    const upcoming =
        events
            .filter(
                event => event.date >= today
            )
            .slice(0, 5);


    if (upcoming.length === 0) {

        container.innerHTML =
            "<p>No upcoming dates yet.</p>";

        return;
    }


    upcoming.forEach(event => {

        const item =
            document.createElement("button");

        item.className =
            "upcoming-event";


        item.innerHTML = `
            <strong>
                ${event.title}
            </strong>

            <small>
                ${formatPrettyDate(event.date)}
            </small>
        `;


        item.addEventListener(
            "click",
            () => {

                selectedDate =
                    event.date;

                currentDate =
                    new Date(
                        event.date + "T00:00:00"
                    );

                renderCalendar();

                selectDate(event.date);
            }
        );


        container.appendChild(item);
    });
}


// ==========================================
// DATE FORMATTING
// ==========================================

function formatDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


function formatPrettyDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );
}


// ==========================================
// MONTH BUTTONS
// ==========================================

document.getElementById(
    "prevMonth"
).addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        renderCalendar();
    }
);


document.getElementById(
    "nextMonth"
).addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );

        renderCalendar();
    }
);


// ==========================================
// BUTTONS
// ==========================================

document.getElementById(
    "saveEventBtn"
).addEventListener(
    "click",
    saveEvent
);


document.getElementById(
    "clearEventBtn"
).addEventListener(
    "click",
    clearEvent
);


// ==========================================
// START
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        loadEvents();

    }
);
