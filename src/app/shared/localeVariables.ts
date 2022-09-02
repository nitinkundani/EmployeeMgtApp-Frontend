interface Locale {
    name: string,
    code: string
  }

export class Variables {
    static locales: Locale [] = [
        {name: 'en-US', code: 'MM/dd/yyyy'},
        {name: 'en-GB', code: 'dd/MM/yyyy'},
        // {name: 'default', code: 'MM/dd/yyyy'}
    ];
    static selectedLocale: Locale = {
        name: "default",
        code: "mediumDate"
      };

      public classReference = Variables;
  }