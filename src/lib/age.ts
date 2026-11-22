// Birthday boundaries use Pune time, so every visitor sees the same age.
const BIRTHDAY = { year: 2005, month: 5, day: 8 } as const;
const INDIA_OFFSET_MS = 330 * 60_000;

function birthdayStart(year: number) {
  return Date.UTC(year, BIRTHDAY.month - 1, BIRTHDAY.day) - INDIA_OFFSET_MS;
}

export function fractionalAge(now: Date) {
  const currentYearInIndia = new Date(now.getTime() + INDIA_OFFSET_MS).getUTCFullYear();
  const lastBirthdayYear = now.getTime() >= birthdayStart(currentYearInIndia)
    ? currentYearInIndia
    : currentYearInIndia - 1;
  const lastBirthday = birthdayStart(lastBirthdayYear);
  const nextBirthday = birthdayStart(lastBirthdayYear + 1);

  return lastBirthdayYear - BIRTHDAY.year +
    (now.getTime() - lastBirthday) / (nextBirthday - lastBirthday);
}
