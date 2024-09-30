export const generateECOAvailableSlots = () => {
  const slots = [];

  // Horários da manhã (08:00 até 11:00 a cada 30 minutos)
  for (let hour = 8; hour <= 11; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
    }
  }

  // Horários da tarde (14:00 até 18:00 a cada 30 minutos)
  for (let hour = 14; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
    }
  }

  return slots;
};
