/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { campusType, TimeTable } from "../store/authStore";
import { Course } from "../store/authStore";

const baseURL = "https://visiting-eba-vitty-d61856bb.koyeb.app";

export const parseAndReturn = async (
  raw: string,
  apiKey: string,
  campus: NonNullable<campusType>
): Promise<TimeTable> => {
  // const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
  const remoteApiUrl = `${baseURL}/api/v2/timetable/parse`;
  // const url = `${corsProxyUrl}${remoteApiUrl}`;
  const myHeaders = {
    contentType: "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    timetable: raw,
    campus: campus,
  };

  try {
    const response = await axios.post(remoteApiUrl, data, {
      headers: myHeaders,
    });
    return response.data;
  } catch (e) {
    return { timetable: null };
  }
};

export const checkUserExists = async (username: string): Promise<any> => {
  const myHeaders = {
    "Content-Type": "application/json",
  };

  const data = {
    uuid: username,
  };

  try {
    const response = await axios.post(
      baseURL + "/api/v2/auth/check-user-exists",
      data,
      {
        headers: myHeaders,
      }
    );
    return response.data;
  } catch (e: Error | any) {
    if (e.response?.status === 400) {
      return e.response?.data;
    } else {
      console.log(e);
      return {};
    }
  }
};

export const uploadText = async (
  raw: Course[] | null,
  apiKey: string,
  username: string
): Promise<any> => {
  // const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
  const remoteApiUrl = `${baseURL}/api/v2/timetable/${username.toLowerCase()}`;
  // const url = `${corsProxyUrl}${remoteApiUrl}`;

  const myHeaders = {
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    timetable: raw,
  };

  try {
    const response = await axios.post(remoteApiUrl, data, {
      headers: myHeaders,
    });
    return response.data;
  } catch (e) {
    return { error: e };
  }
};

export const isAvailable = async (username: string): Promise<any> => {
  const myHeaders = {
    "Content-Type": "application/json",
  };

  const data = {
    username: username,
  };

  try {
    const response = await axios.post(
      baseURL + "/api/v2/auth/check-username",
      data,
      {
        headers: myHeaders,
      }
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 400) {
      return e.response?.data ?? { error: e };
    } else {
      console.log(e);
      return {};
    }
  }
};

export const getTimetable = async (
  username: string,
  apiKey: string
): Promise<any> => {
  const remoteApiUrl = `${baseURL}/api/v2/timetable/${username}`;
  const headers = {
    Authorization: `Token ${apiKey}`,
  };

  try {
    const response = await axios.get(remoteApiUrl, { headers: headers });
    const data = response.data;
    if (data === null) {
      return "empty timetable";
    } else {
      return data;
    }
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};

export const getToken = async (uuid: string): Promise<any> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    uuid: uuid,
    // "regNo": regNo,
    // "username": username
  });

  const requestOptions = {
    method: "POST",
    body: raw,
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      baseURL + "/api/v2/auth/firebase/",
      requestOptions as any
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return { e };
  }
};

export const signIn = async (
  uuid: string,
  regNo: string,
  username: string,
  campus: campusType
): Promise<any> => {
  const data: { uuid: string; username: string; campus: campusType; regNo?: string } = {
    uuid: uuid,
    username: username,
    campus: campus,
  };
  if (regNo != "") {
    data.regNo = regNo;
  }
  const myHeaders = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      baseURL + "/api/v2/auth/firebase/",
      data,
      { headers: myHeaders }
    );
    return response.data;
  } catch (e: any) {
    console.log(e);
    return { detail: e.response?.data?.detail };
  }
};
