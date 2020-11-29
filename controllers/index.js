// export * from './AreaController';
// export * from './AuthenController';
// export * from './PersonelController';
// export * from './SchoolController';
// export * from './SettingController';
// export * from './StandardCodeController';
// export * from './TeacherController';
// export * from './UploadController';
// export * from './UserController';

import AreaController from './AreaController'
import AuthenController from './AuthenController'
import PersonelController from './PersonelController'
import SchoolController from './SchoolController'
import SettingController from './SettingController'
import StandardCodeController from './StandardCodeController'
import TeacherController from './TeacherController'

import UserController from './UserController'

import MessageProvider from './testController'

export const Area = new AreaController()
export const AuthenService = new AuthenController()
export const Personel = new PersonelController()
export const School = new SchoolController()
export const SettingService = new SettingController()
export const StandardCodeService = new StandardCodeController()
export const Teacher = new TeacherController()

export const User = new UserController()

export const MessageService = new MessageProvider('message')
