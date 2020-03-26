export class Lead {
    constructor(public title: string,
                public description: string,
                public status: number,
                public user_assigned_id: number,
                public client_id: number,
                public user_created_id: number,
                public contact_date: string
    ) { }
}
