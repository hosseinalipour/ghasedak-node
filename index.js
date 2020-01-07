const metadata = {
  send: {
    fields: ["senddate", "checkid"],
    required: ["message", "receptor", "linenumber"],
    endpoint: "https://api.ghasedak.io/v2/sms/send/simple"
  },
  bulk: {
    fields: ["senddate", "checkid"],
    required: ["message", "receptor", "linenumber"],
    endpoint: "https://api.ghasedak.io/v2/sms/send/bulk"
  },
  pair: {
    fields: ["senddate", "checkid"],
    required: ["message", "receptor"],
    endpoint: "https://api.ghasedak.io/v2/sms/send/pair"
  },
  verification: {
    fields: [
      "checkid",
      "param2",
      "param3",
      "param4",
      "param5",
      "param6",
      "param7",
      "param8",
      "param9",
      "param10"
    ],
    required: ["param1", "receptor", "template", "type"],
    endpoint: "https://api.ghasedak.io/v2/verification/send/simple"
  },
  voice: {
    fields: ["senddate"],
    required: ["message", "receptor"],
    endpoint: "https://api.ghasedak.io/v2/voice/send/simple"
  },
  status: {
    fields: [],
    required: ["id", "type"],
    endpoint: "https://api.ghasedak.io/v2/sms/status"
  },
  newGroup: {
    fields: ["parent"],
    required: ["name"],
    endpoint: "https://api.ghasedak.io/v2/contact/group/new"
  },

  addNumber: {
    fields: ["firstname", "lastname", "email"],
    required: ["groupid", "number"],
    endpoint: "https://api.ghasedak.io/v2/contact/group/addnumber"
  },
  groupList: {
    fields: ["parent"],
    required: [],
    endpoint: "https://api.ghasedak.io/v2/contact/group/list"
  },
  listNumber: {
    fields: ["offset", "page"],
    required: ["groupid"],
    endpoint: "https://api.ghasedak.io/v2/contact/group/listnumber"
  },
  groupEdit: {
    fields: [],
    required: ["groupid", "name"],
    endpoint: "https://api.ghasedak.io/v2/contact/group/edit"
  },
  groupRemove: {
    fields: [],
    required: ["groupid"],
    endpoint: "https://api.ghasedak.io/v2/contact/group/remove"
  },
  receiveLast: {
    fields: [],
    required: ["linenumber", "isread"],
    endpoint: "https://api.ghasedak.io/v2/sms/receive/last"
  },
  receivePaging: {
    fields: [],
    required: ["offset", "page", "todate", "fromdate", "isread", "linenumber"],
    endpoint: "https://api.ghasedak.io/v2/sms/receive/paging"
  },
  smsCancel: {
    fields: [],
    required: ["messageid"],
    endpoint: "https://api.ghasedak.io/v2/sms/cancel"
  },
  accountInfo: {
    fields: [],
    required: [],
    endpoint: "https://api.ghasedak.io/v2/account/info"
  }
};

const axios = require("axios");

const api = axios.create({
  validateStatus: () => true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

function validateOpts(opts, fields, required) {
  for (const key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (!fields.includes(key) && !required.includes(key)) {
        throw new Error(`'${key}' property is unkown.`);
      }
    }
  }

  for (const f of required) {
    if (!opts.hasOwnProperty(f)) {
      throw new Error(`'${f}' property is required.`);
    }
  }

  const params = new URLSearchParams();

  for (const key in opts) {
    if (opts.hasOwnProperty(key)) {
      const element = opts[key];
      params.append(key, element);
    }
  }
  return params;
}

module.exports = function(apikey) {
  return new Proxy(
    {},
    {
      get: (obj, prop) => {
        return opts => {
          if (!metadata.hasOwnProperty(prop)) {
            throw new Error(`method '${prop}' is unkown.`);
          }

          const params = validateOpts(
            opts,
            metadata[prop].fields,
            metadata[prop].required
          );

          return api
            .post(metadata[prop].endpoint, params, {
              headers: {
                apikey
              }
            })
            .then(res => res.data);
        };
      }
    }
  );
};
