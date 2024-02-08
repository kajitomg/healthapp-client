import {Context, createContext} from 'react';
import {Services} from "./shared/services";
import config from "./config.ts";

export const ServicesContext:Context<Services> = createContext(new Services(config));