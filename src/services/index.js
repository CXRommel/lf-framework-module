import { userService } from "./userService";
import { countryService } from "./countryService";
import { studentService } from "./studenService";
import { parentsService } from "./parentsService";

export default {
  users: userService,
  countries: countryService,
  students: studentService,
  parents: parentsService,
};
