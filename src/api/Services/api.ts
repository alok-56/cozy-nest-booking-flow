import { BASEURL } from "../Baseurl";

// serach rooms
export const searchRooms = async (
  hotelId: string,
  startDate: string,
  endDate: string
): Promise<any> => {
  const params = new URLSearchParams({
    hotelId,
    startDate,
    endDate,
  });

  const res = await fetch(`${BASEURL}/room/search?${params.toString()}`, {});

  const data = await res.json();

  return data;
};

// get all hotels
export const getAllHotels = async () => {
  const res = await fetch(`${BASEURL}/web/hotels`, {});
  const data = await res.json();

  return data;
};

// get hotel by id
export const getAllHotelsbyid = async (id: string, room: any): Promise<any> => {
  const res = await fetch(`${BASEURL}/web/hotels/${id}`, {
    method: "GET",
  });

  const data = await res.json();
  return data;
};

// book rooms
export const createBooking = async (payload: any): Promise<any> => {
  const res = await fetch(`${BASEURL}/booking/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

// validate payments
export const Validatepayments = async (merchantTransactionId) => {
  const res = await fetch(
    `${BASEURL}/booking/payment/validate/${merchantTransactionId}`,
    {}
  );
  const data = await res.json();

  return data;
};

// booking using merchant transaction ID
export const Getbookingstatus = async (id: any): Promise<any> => {
  const res = await fetch(`${BASEURL}/booking/check/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};

// create b2b
export const createB2B = async (payload: any): Promise<any> => {
  const res = await fetch(`${BASEURL}/public/b2b`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

// create contact
export const createContact = async (payload: any): Promise<any> => {
  const res = await fetch(`${BASEURL}/public/contact-us`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};
