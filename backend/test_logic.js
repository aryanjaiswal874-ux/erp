import moment from 'moment';

const calculateWorkingDays = async (startDate, endDate) => {
    try {
        // Mocking settings and holidays for local test
        const weekOffs = ["Sunday"];
        const holidays = []; // Assume no holidays for now

        let count = 0;
        let cur = moment(startDate);
        const end = moment(endDate);

        while (cur <= end) {
            const dayName = cur.format("dddd");
            const isWeekOff = weekOffs.includes(dayName);
            const isHoliday = false; // Mock

            if (!isWeekOff && !isHoliday) {
                count++;
            }
            cur.add(1, 'days');
        }
        return count;
    } catch (err) {
        return moment(endDate).diff(moment(startDate), 'days') + 1;
    }
};

async function test() {
    const start = "2026-04-01";
    const end = "2026-04-30";
    const days = await calculateWorkingDays(start, end);
    console.log(`April 2026 Working Days (excl Sundays): ${days}`);
}

test();
