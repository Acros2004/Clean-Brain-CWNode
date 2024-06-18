import ClientRepository from "../repositories/ClientRepository.js";
import PsychologistRepository from "../repositories/PsychologistRepository.js";
import ProceduresRepository from "../repositories/ProceduresRepository.js";
import BookingRepository from "../repositories/BookingRepository.js";
import DegreeRepository from "../repositories/DegreeRepository.js";
import SpecializationRepository from "../repositories/SpecializationRepository.js";
import ReviewRepository from "../repositories/ReviewRepository.js";
import VoucherRepository from "../repositories/VoucherRepository.js";
import CollectionSpezializationRepository from "../repositories/CollectionSpezialization.js";
import RefreshSessionRepository from "../repositories/RefreshSessionRepository.js";
import TimeTableRepository from "../repositories/TimeTableRepository.js";
import EmailAuthenticationRepository from "../repositories/EmailAuthenticationRepository.js";
import UserSocketsRepository from "../repositories/UserSocketsRepository.js";
import connectionSource from "../database/connection/context.js";

class UnitOfWork {
  constructor() {
      this.typeORM = connectionSource;
      this.clientRepository = new ClientRepository(this.typeORM.getRepository('Client'));
      this.psychologistRepository = new PsychologistRepository(this.typeORM.getRepository('Psychologist'));
      this.proceduresRepository = new ProceduresRepository(this.typeORM.getRepository('Procedures'));
      this.bookingRepository = new BookingRepository(this.typeORM.getRepository('Booking'));
      this.degreeRepository = new DegreeRepository(this.typeORM.getRepository('Academic_Degree'));
      this.specializationRepository = new SpecializationRepository(this.typeORM.getRepository('Specialization'));
      this.reviewRepository = new ReviewRepository(this.typeORM.getRepository('Review'));
      this.voucherRepository = new VoucherRepository(this.typeORM.getRepository('Voucher'),this.typeORM.getRepository('Booking'));
      this.collectionSpezializationRepository = new CollectionSpezializationRepository(this.typeORM.getRepository('CollectionSpezialization'));
      this.refreshSessionRepository = new RefreshSessionRepository(this.typeORM.getRepository('RefreshSessions'));
      this.timeTableRepository = new TimeTableRepository(this.typeORM.getRepository('Timetable'));
      this.emailAuthenticationRepository = new EmailAuthenticationRepository(this.typeORM.getRepository('EmailAuthentication'));
      this.userSocketsRepository = new UserSocketsRepository(this.typeORM.getRepository('UserSockets'));
    }
  }
  
export default UnitOfWork;
  