type Messages = {
    welcome: string;
    description: string;
    recommendations: string;
    temples: string;
    brihadeeswarar: string;
    meenakshi: string;
    srirangam: string;
    ramanathaswamy: string;
    discover: string;  // Ensure discover exists
  };
  
  export async function getMessages(locale: string): Promise<Messages> {
    switch (locale) {
      case "ta":
        return (await import("../messages/ta.json")).default as Messages;
      case "en":
      default:
        return (await import("../messages/en.json")).default as Messages;
    }
  }
  