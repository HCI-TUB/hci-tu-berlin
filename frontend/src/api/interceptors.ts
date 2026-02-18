import http from "./http";
import { currentLang } from "@/i18n/lang";

http.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = currentLang.value;
    return config;
});