import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUser } from "src/app/models/user.model";
import { ITask } from "src/app/models/task.model";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-assign-task",
  templateUrl: "./assign-task.component.html",
  styleUrls: ["./assign-task.component.css"],
})
export class AssignTaskComponent implements OnInit {
  taskForm: FormGroup;
  users: IUser[] = [];
  user: IUser;
  user_tasks: ITask[] = [];
  selected_user: IUser;
  sub: Subscription;
  calendarOptions = {
    isFromNow: true,
    toDate: moment().add(1, "M"),
  };
  start_date = null;
  end_date = null;
  calendarEvents = [];
  end_date_in_past: boolean = true;
  start_date_in_past: boolean = true;
  end_date_today: boolean = true;
  start_date_today: boolean = true;
  module_name_number: string[] = [];
  soa: string[] = [
    "Financial Accounting	- ACC1110",
    "Financial Accounting	- ACC1115",
    "Accounting Information Systems -	ACC1135",
    "Advanced Financial Accounting - ACC2120",
    "Advanced Management Accounting -	ACC2125",
    "Accounting & Finance for Bus	- ACC2222",
    "Applied Financial Accounting -	ACC2810",
    "Applied Management Accounting - ACC2820",
    "Accounting Theory - ACC3125",
    "Taxation -	ACC3140",
    "Fin. Statem. Analysis & Valua. - ACC3155",
    "Corporate Governance - ACC3165",
    "Audit and Assurance - ACC3175",
    "Financial Concepts of Business -	FIN1212",
    "Personal Financial Behaviour	- FIN2840",
    "Business Finance	- FIN3120",
    "Finance - FIN3130",
    "International Finance - ECS3350",
    "Financial Mathematics - MSO2620",
    "Financial Statistics - MSO3620",
    "Financial Business Environment - FIN1120",
    "Applied Corporate Finance - FIN4550",
  ];
  sob: string[] = [
    "Project Management and Profess - CST2560",
    "Management Concepts - MGT1306",
    "Operations Management - MGT2222",
    "Strategic Management - MGT3172",
    "Managing Projects - MGT4550",
    "Marketing Theory and Practice - MKT1120",
    "Marketing Theory and Practice (Jan Start) - MKT1120/22",
    "Digital Marketing Strategy - MKT2002",
    "Services Marketing Management - MKT3125",
    "International Marketing - MKT3130",
    "Creative Advertising & Promotion	- MKT3151",
    "Human Resource Mgt in Practice - HRM2118",
    "Principles of Inno & Entreshp - MGT2322",
    "Principles of Inno & Entreshp - MGT2325",
    "Principles of Inno & Entrepshp - MGT2326",
    "Organisational Mgt Consultancy - MGT4544",
    "Marketing Theory and Practice - MKT1122",
    "Quantitative Methods for Bus - MSO1740",
    "Financial Data Analysis - MSO1625",
    "Management Decision Making	- MSO4735",
  ];
  sol: string[] = [
    "English Legal System - LAW1102",
    "Legal Method	- LAW1104",
    "Public Law - LAW1106",
    "Law of Contract - LAW1108",
    "Criminal Law	- LAW2101",
    "Tort - LAW2105",
    "EU Law	- LAW2110",
    "Consumers and the Law - LAW2114",
    "Alternative Dispute Res&LegEth	- LAW2115",
    "Business Law	- LAW2130",
    "UK and European Human Rights L	- LAW2464",
    "Land Law	- LAW3101",
    "UK Company Law	- LAW3102",
    "Equity and Trusts - LAW3103",
    "UK Company Law	- LAW3109",
    "Child and Family Law - LAW3116",
    "Child and Family Law	- LAW3161",
    "Public International Law -	LAW3181",
    "Public International Law	- LAW3182",
    "Evidence	- LAW3426",
    "Evidence	- LAW3428",
    "Dissertation	- LEX4165",
    "Law & Policy of the World - LEX4708",
    "Int'l Org & Int' Dspte Reslt'n	- LEX4714",
    "Int'l Commercial Liti & Arbi	- LEX4720",
    "Comparitive Corporate Governan	- LEX4722",
    "Foundations and Principles of International Law - LEX4704",
  ];
  sost: string[] = [
    "Engineering Software Developme	- CCE2050",
    "Postgraduate Project in Comput - CCE4910",
    "Postgraduate Computing Project -	BIS4992",
    "Web Applications and Databases - CSD2550",
    "Introduction to Programming - CST1150",
    "Emerging Technologies in Pract	- CST1160",
    "Information in Organisations	- CST1340",
    "Computer Systems Architecture - CST1500",
    "Science,Technology, Engineerin - CST1520",
    "Web Applications and Databases - CST2120",
    "Information Systems Analysis a	- CST2310",
    "Novel Interaction Technologies	- CST3140",
    "Artificial Intelligence - CST3170",
    "User Experience (UX) Design - CST3180",
    "Strategic Information Systems - CST3310",
    "Business Intelligence - CST3340",
    "UG Individual Project - CST3390",
    "Undergraduate Individual Project	- CST3990",
    "Information Systems Quality Ma	- CST4310",
    "Regulation of Electronic Comme -	CST4320",
    "Information Systems Strategy a	- CST4330",
    "Network Design and Performance	- CST4510",
    "Virtualisation and Cloud Compu	- CST4570",
    "Data Management and Business	- CST2130",
    "Data Management for Decision S	- CST4340",
    "Knowledge Management Strategie -	CST4350",
    "Software Engineering Managemen	- CST2550",
    "Network Security and Mechanism	- CST4560",
    "Enterprise Network Troubleshoo	- CST4580",
  ];
  sop: string[] = [
    "Research Methods and Design - PSY1016",
    "Mind & Behaviour in Context - PSY1020",
    "The Counselling Relationship	- PSY1021",
    "Applied Psychology Res Meth - PSY2005",
    "Social Psychology & Indv Diff - PSY2009",
    "Developmental Psychology	- PSY2014",
    "Counselling & Psy Therapies - PSY2016",
    "Mental Health, Well Being - PSY3017",
    "Psychoanalysis in Context - PSY3021",
    "Professional Practice - PSY3024",
    "Affective Science & Pos Psycho - PSY3026",
    "Dissertation	- PSY3330",
    "Research Methods Applied Psych - PSY4012",
    "Research: Practice & Reporting	- PSY4035",
    "Research and Issues in Applied	- PSY4045",
    "Counselling & Psycho in Appl	- PSY4115",
    "People Management - HRM1306",
    "Organisational Behaviour - HRM2018",
    "Applied Psychometrics - PSY4046",
    "People Management - HRM1301",
    "Human Resource in Practice	- HRM2118",
    "Organisational Behaviour - HRM2018",
    "Leadership and Management Development - HRM3006",
    "The Service Encounter - HRM3013",
    "Philosophy and Policy in HE - LED4010",
    "Pedagogy of Higher Education	- LED4011",
    "Psychology of Learning in HE	- LED4012",
    "Pedagogy and Practice in HE - LED4013",
  ];

  constructor(
    private _task: TaskService,
    private _auth: AuthService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      task: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      end_date: new FormControl("", [Validators.required]),
      assigned_to: new FormControl("", [Validators.required]),
      module: new FormControl("", [Validators.required]),
    });

    this.sub = this._auth.user.subscribe((user: IUser) => {
      this.user = user;
    });

    this.sub = this._task.get_all_users().subscribe((users: IUser[]) => {
      this.users = users;
    });
  }

  ngOnDestroy = (): void => {
    this.sub.unsubscribe();
  };

  onChooseStartDate = (date: string) => {
    if (date !== null) {
      this.start_date = moment(date).format();
      this.taskForm.controls.start_date.setValue(this.start_date);
      this.check_date(this.start_date, "start_date");
    }
  };

  onChooseEndDate = (date: string) => {
    if (date !== null) {
      this.end_date = moment(date).format();
      this.taskForm.controls.end_date.setValue(this.end_date);
      this.check_date(this.end_date, "end_date");
    }
  };

  add_task = () => {
    const {
      task,
      description,
      start_date,
      end_date,
      module,
    } = this.taskForm.value;

    const data = {
      task,
      description,
      start_date,
      end_date,
      assigned_to: this.selected_user.email,
      module,
      completed: false,
      status: "assigned",
      assigned_by: this.user.email,
      assigned_to_avatar: this.selected_user.photoURL,
      attachments: [],
      comments: [],
    };

    this._task.add_task(data);
    this.taskForm.reset();
  };

  check_date = (date: string, fc: string) => {
    if (moment().isAfter(date)) {
      this.taskForm.get(`${fc}`).setErrors({
        date_in_past: true,
      });
      if (fc === "end_date") {
        if (moment(this.end_date).isBefore(this.start_date)) {
          this.taskForm.controls.end_date.setErrors({
            start_date_before_end_date: true,
          });
          console.log("start_date_before_end_date");
        }
      }
    } else {
      this.taskForm.get(`${fc}`).setErrors({});
    }
  };

  get_user_tasks = async (uid: string) => {
    if (uid !== "") {
      this._spinner.show();

      this._task.get_user(uid).subscribe((user: IUser) => {
        this.selected_user = user;

        this._task.get_user_tasks(user.email).subscribe((tasks: ITask[]) => {
          this.user_tasks = tasks;

          if (tasks.length > 0) {
            tasks.map((t: ITask) => {
              this.calendarEvents.push(moment(t.start_date));
            });
          }
        });

        this._spinner.hide();
      });
    }
  };

  populate_module = (school: string) => {
    switch (school) {
      case "SCHOOL OF ACCOUNTING":
        this.module_name_number = this.soa;
        break;
      case "SCHOOL OF BUSINESS":
        this.module_name_number = this.sob;
        break;
      case "SCHOOL OF LAW":
        this.module_name_number = this.sol;
        break;
      case "SCHOOL OF SCIENCE & TECHNOLOGY":
        this.module_name_number = this.sost;
        break;
      case "SCHOOL OF PYSCHOLOGY":
        this.module_name_number = this.sop;
        break;
    }
  };
}
