module.exports = {
    SUCCESS: 'Success',
    NO_DATA_PROVIDED: 'No data provided',
    RECORD_DELETED_SUCCESS: 'Record deleted successfully',
    RECORD_UPDATE_SUCCESS: 'Record updated successfully',
    EMPTY_FILE_PROVIDED: 'File can not be empty',
    SUCCESS_CODE_MESSAGE: 'Request successful',
    BAD_CODE_MESSAGE: 'Bad Request',
    SESSION_EXPIRED_MESSAGE: 'We signed you out to protect your account, please Sign In again!',
    UNAUTH_MESSAGE: 'UnAuthorized Request',
    JSON_VALIDATED: 'Json Validated',
    JSON_UNVALIDATION: "Json is not what has been asked",
    UNVALID_STATUS: "Input parameter must be valid",
    NULL_ELEMENTS: "One or more objectives are null.",
    FAILED_TO_WRITE: "Error while writing in file",
    ASSISTANT: {
        ASSISTANT_FAILED_TO_CREATE_THREAD: "Unable to create thread",
        ASSISTANT_THREAD_SUCCESS: "Document uploaded successfully",
        ASSISTANT_PENDING_RESPONSE: "Kolabrya response is in progess",
        ASSISTANT_SUCCESS_RESPONSE: "Successfully got the response from kolabrya",
        ASSISTANT_FAILED_RESPONSE: "Request failed from kolabrya",
        ASSISTANT_EXPIRED_RESPONSE: "Request expired from kolabrya",
        ASSISTANT_NO_RESPONSE: "Write your message in different way",
        ASSISTANT_ERROR: "No runId Found",
        ASSISTANT_THREAD_RUN: "Unable to get run id",
        ASSISTANT_CLEAR_THREAD: "Thread clear successfully",
        ASSISTANT_FILE_UPLOAD_ERROR: "Unable to upload the file. Please try again",
        ASSISTANT_THREADS_ENCRYPTION: "Encrypted Successfully",
        ASSISTANT_IMPROVED_PROMPT_SUCCESS: "Prompt uploaded successfully",
        ASSISTANT_RESEARCH_SUCCESS: "Research query uploaded successfully",
        ASSISTANT_KOLABRYA_AGENT_SUCCESS: "Agent query uploaded successfully"
    },    
    ERROR: {
        VERIFICATION_EMAIL: "Email has not yet been verified, we have sent another email for verification.",
        EMAIL_EXIST: "Email address already exists",
        INVALID_CREDS: "Enter a valid email address and password",
        CURR_PASSWORD_WRONG: "Current Password is wrong",
        PACKAGE_EXPIRED: "You don't have any active package right now.",
        EMAIL_NOT_EXISTS: "Email address does not exists",
        SOME_THING_WENT_WRONG: "Something went wrong. Please try again",
        PRD_SERVICES_DOWN: "One or more services are currently unavailable.",
        REFRESH_ON_ERROR: "Refresh Kolabrya and browser and try again",
        RECORD_UPDATE_ERROR: "Unable to update the record",
        ERROR_RE_TRY: "Kolabrya is re-analaysing document for higher accuracy response",
        RECORD_ALREADY_EXSIST: "Record already exsist",
        ACCESS_NOT_GRANTED: "Access not granted. Please contact your administrator for permissions.",
        INVALID_PASSWORD: "Enter a valid password",
        ERROR_WAIT: "Please wait a moment and try your request again. If the problem persists, feel free to contact support for further assistance.",
        ERROR_LOGOUT: "Please refresh your browser, re-upload the files, and try running the analysis again.",
        ERROR_RE_TRY_FROM_BACKGROUND_JOB: "Kolabrya is working to get the ", //summary
        ERROR_RE_TRY_COUNT_FINISHED_v1: "Kolabrya encountered an error while processing page ",
        ERROR_RE_TRY_COUNT_FINISHED_v1_1: ", please try again",
        ERROR_RE_TRY_COUNT_FINISHED_v2: "Kolabrya encountered an error while processing, please try again",
    },
    SUCCESS_MESSAGES: {
        SIGNED_UP: "Successful signed up",
        LOGGED_IN: "Successful Login",
        INFORAMATION_UPDATED: "Information updated",
        VERIFIED: "User has been verified",
        PASSWORD_UPDATED: "Password updated",
        IMAGE_UPLOADED: "Image Uploaded",
        EMAIL_SENT: "Email sent",
        RECORD_INSERT_SUCCESS: "Record inserted successfully",
        ALL_RECORDS_PROCESS_SUCCESS: "You can refine and enhance the summary using the text box below. For instance, you could specify, 'Keep the summary in the third person but maintain the original length.’",
    },
    RECALL: {
        //code: ready, joining_call, in_waiting_room, in_call_not_recording, in_call_recording, call_ended, done
        BOT_NAME: 'Kolabrya Assistant',
        DONE: 'done',
        IN_CALL_RECORDING: 'in_call_recording',
        EVENTS: {
            BOT_STATUS_CHANGED: "bot.status_change",
            BOT_TRANSCRIPTION: "bot.transcription",
            CALENDAR_SYN_EVENTS: "calendar.sync_events",
            CALENDAR_UPDATE: "calendar.update"
        },
        FILE_DOWNLOAD_ERROR: "Unable to download file from recall"
    },
    ROOM: {
        ROOM_ALREADY_CREATED: "Room is already created on this meeting url",
        START_TIME: "To add agenda, meeting start time must be 2 minutes earlier",
        SUCCESS: 'Room created successfully',
        UPDATED: 'Updated room id',
        CURRENT: 'Bot id is not updated',
        EMPTY: 'No record found',
    },
    MEETING: {
        URL_NOT_FOUND: "Meeting url not found",
        TITLE: "Meeting title not found",
        TIME: "Meeting start time or end time not found",
    },
    FILE: {
        ACCEPT_FILE_TYPE: "Invalid file type. Only accept pdf, docx, txt, pptx",
        ACCEPT_PDF_DOCX_FILE_TYPE: "Invalid file type. Only accept docx or pdf",
        ACCEPT_DOCX_FILE_TYPE: "Invalid file type. Only accept docx",
        ACCEPT_AUDIO_FILE_TYPE: "Invalid file type. Only accept MP4, WebM video files, and WAV, MPEG, MP4 audio files",
        FILE_DELETE: 'File deleted successfully',
        EMPTY_FILE: 'File can not be empty',
        FILE_CREATED: 'File created successfully',
        FILE_WRITTEN_SUCCESS: 'File written successfully',
        FILE_UPLOAD_LIMIT_EXCEEDS: 'File upload limit exceeded',
        FILE_UPLOAD_QUOTA: 'File upload limit exceeded, The remaining file upload quota is ',
        ALLOWED_FILES: 'File upload limit exceeded, You are only allowed to upload ',
        UN_COMPLETE_FILE: 'Missing or incomplete parsed data',
        CASE_DOC_LIMIT: 'Only 20 document files are allowed to upload',
        CASE_AUD_LIMIT: 'Only 2 audio files are allowed to upload',
        CASE_DOC_SIZE_LIMIT: 'The file size exceeds the maximum limit of 20 MB for case files. Please upload a smaller file',
        CASE_AUD_SIZE_LIMIT: 'The file size exceeds the maximum limit of 10 MB for audio files. Please upload a smaller file.',
    },
    BOT: {
        BOT_NAME: "Bot name updated successfully"
    },
    OBJECTIVE: {
        OBJECTIVE_LENGTH: "Objectives are in range of 1 to 10"
    },
    SAMPLE: {
        SAMPLE_LIMIT: "More than 1 sample is not allowed",
        ALLOW_ONLY_ONE_FILE: "More than 1 File are not allowed",
        ALLOW_ONLY_ONE_RESPONSE: "More than 1 Response are not allowed"
    },
    USER: {
        ADMIN:{
            ALREADY_ADMIN: 'This user already has admin rights'
        },
        DEACTIVATION_SUCCESSFULLY: 'User deactivated successfully'
    },
    OTP_TYPE: {
        SIGN_IN: 1,
        FORGOT_PASSWORD: 2,
        OTP_EXPIRED: "OTP verification failed. Please try again",
        OTP_SENT_SUCCESSFULLY: "OTP has been sent to your email"
    },
    PAGE: {
        PROCESS_FAILED: "Processing failed for page ",
        GATHERING_STATUS: "Kolabrya is gathering the status"
    }
}