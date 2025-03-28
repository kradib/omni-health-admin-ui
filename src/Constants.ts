export const enum RouteConstants {
  LOGIN_ROUTE = "login",
  REGISTER_ROUTE = "register",
  APPOINTMENT_ROUTE = "appointments",
  DOCTOR_ROUTE = "doctors",
  PATIENT_ROUTE = "patients",
  HELP_CENTER_ROUTE = "support",
}

export class ApiRoutes {
  public static BASE_ROUTE = "/api/v1";

  public static USER_BASE_ROUTE = `${this.BASE_ROUTE}/user`;
  public static ADMIN_BASE_ROUTE = `${this.BASE_ROUTE}/admin`;
  public static APPOINTMENT_BASE_ROUTE = `${this.BASE_ROUTE}/appointment`;
  public static DOCUMENT_BASE_ROUTE = `${this.BASE_ROUTE}/documents`;

  public static ADD_USER_ROUTE = `${this.ADMIN_BASE_ROUTE}/addUser`;
  public static UPDATE_USER_ROUTE = `${this.ADMIN_BASE_ROUTE}/updateUser`;
  public static GET_USER_ROUTE = `${this.ADMIN_BASE_ROUTE}/listUsers`;
  public static LOGIN_USER_ROUTE = `${this.ADMIN_BASE_ROUTE}/signin`;
  public static RESET_PASSWORD_ROUTE = `${this.USER_BASE_ROUTE}/reset-password`;

  public static APPOINTMENT_SLOT_ROUTE = `${this.APPOINTMENT_BASE_ROUTE}/slots`;
  public static DEPENDENT_APPOINTMENT_ROUTE = `${this.APPOINTMENT_BASE_ROUTE}/dependents`;
  public static APPOINTMENT_NOTES_ROUTE = `note`;
  public static APPOINTMENT_DOCUMENT_ROUTE = `document`;

  public static UPLOAD_FILE_ROUTE = `${this.DOCUMENT_BASE_ROUTE}/upload`;
}

export const REDIRECT_TIMEOUT = 3000;
export const RESEND_ATTEMPTS = 3;
export const RESEND_TIME_INTERVAL = 60;
export const SNACKBAR_TIMEOUT = 3000;
export const AUTH_TOKEN_KEY = "bearerToken";
export const USER_DETAILS_KEY = "userDetails";
export const DATE_FORMAT = "YYYY-MM-DD";
export const TIME_INPUT_FORMAT = "hh:mm A";
export const DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const SUPPORTED_FILE_TYPES_FOR_UPLOAD = [
  "application/pdf",
  "image/jpeg",
];

export const APPOINTMENT_MODE_OWN = "own";
export const APPOINTMENT_MODE_DEPENDENT = "dependent";

export const MAX_PERMISSIBLE_UPLOAD_FILE_SIZE_MB = 5;

export const BLOOD_GROUP_TYPES = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "Others",
];

export const GENDER_OPTIONS = [
  "MALE",
  "FEMALE",
  "OTHERS"
]

export const PENDING_APPOINTMENT_STATUS = "Pending";
export const PAST_DUE_APPOINTMENT_STATUS = "Past due";
export const COMPLETED_APPOINTMENT_STATUS = "Completed";
export const CONFIRMED_APPOINTMENT_STATUS = "Confirmed";
export const CANCELLED_APPOINTMENT_STATUS = "Cancelled";

export const EDITABLE_APPOINT_STATUS = [
  PENDING_APPOINTMENT_STATUS,
  CONFIRMED_APPOINTMENT_STATUS,
  PAST_DUE_APPOINTMENT_STATUS
];

export const APPOINTMENT_STATUS_OPTIONS = [
  "All",
  COMPLETED_APPOINTMENT_STATUS,
  CANCELLED_APPOINTMENT_STATUS,
];
