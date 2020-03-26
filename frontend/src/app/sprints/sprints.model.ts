export class Sprint {
    constructor(public title: string,
                public description: string,
                public status: number,
                public lead_assigned_id: number,
                public user_created_id: number,
             //   public client_id: number,
               // public invoice_id: number,
                public deadline: string
    ) { }
}
