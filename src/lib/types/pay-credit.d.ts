export type TPayCreditResponse = {
    message: string;
    session: { 
      id: string;
      url: string;
      cancel_url:string;
      success_url:string;
    };
  };