import "moment/locale/ko";

import moment from "moment";

moment.calendarFormat = function (myMoment, now) {
	var diff = myMoment.diff(now, "days", true);
	var beforeMonth = now.clone().subtract(1, "month");

	var retVal =
		diff < -60
			? "오래 전"
			: beforeMonth.month() === myMoment.month() && diff < -32
			? "1개월 전"
			: diff < -27
				? "4주 전"
				: diff < -20
					? "3주 전"
					: diff < -13
						? "2주 전"
						: diff < -6
							? "일주일 전"
							: diff < -1
								? `${diff}일 전`
								: diff < 0
									? "어제"
									: diff < 1
										? "오늘"
										: diff < 2
											? "내일"
											: "몇일 후";

	return retVal;
};

export const toRelativeTime = (time: string) => {
	moment.locale("ko");
	return moment(new Date(time)).fromNow();
};

export const toAbsoluteTime = (time: string) => {
	moment.locale("ko");
	return moment(time).format("LL");
};

export const toAbsoluteTimeEnglish = (time: string) => {
	moment.locale("en");
	return moment(time)
		.format("YYYY.MM.DD ddd")
		.toUpperCase();
};

export const toCalendar = (time: string) => {
	moment.locale("ko");
	return moment.calendarFormat(moment(time), moment());
};

export const toCommaNumber = (number: number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const inputPhoneNumber = (number: string) => {
	const phoneNumber = number.replace(/-/g, "");
	let phone = "";

	if (phoneNumber.length < 4) {
		return phoneNumber;
	} else if (phoneNumber.length < 7) {
		phone += phoneNumber.substr(0, 3);
		phone += "-";
		phone += phoneNumber.substr(3);
	} else if (phoneNumber.length < 11) {
		phone += phoneNumber.substr(0, 3);
		phone += "-";
		phone += phoneNumber.substr(3, 3);
		phone += "-";
		phone += phoneNumber.substr(6);
	} else {
		phone += phoneNumber.substr(0, 3);
		phone += "-";
		phone += phoneNumber.substr(3, 4);
		phone += "-";
		phone += phoneNumber.substr(7);
	}
	return phone;
};

export const getColorName = (color: string) => {
	
	switch (color) {
		case '#000000':
			return 'Black';
			break;
		case '#ffffff':
			return 'White';
			break;
		case '#d1d1d1':
			return 'Gray';
			break;
		case '#854a1c':
			return 'Brown';
			break;
		case '#ffddc2':
			return 'Beige';
			break;
		case '#72b137':
			return 'Green';
			break;
		case '#2643e3':
			return 'Blue';
			break;
		case '#bc26e3':
			return 'Purple';
			break;
		case '#ffdb70':
			return 'Yellow';
			break;
		case '#ff70d9':
			return 'Pink';
			break;
		default:
			return 'Invalid Color Type';
			break;
	}
}