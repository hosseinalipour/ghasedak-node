const axios = require("axios");
const api = axios.create({
  validateStatus: () => true
});

function validateOpts(opts, fields, required) {
  for (const key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (!fields.includes(key)) {
        console.error(`${key} is unkown.`);
        return false;
      }
    }
  }

  for (const f of required) {
    if (!opts.hasOwnProperty(f)) {
      console.error(`${f} is required.`);
      return false;
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
  async function send(opts) {
    const params = validateOpts(
      opts,
      ["message", "receptor", "linenumber", "senddate", "checkid"],
      ["message", "receptor", "linenumber"]
    );

    if (!params) return false;

    return api
      .post("https://api.ghasedak.io/v2/sms/send/simple", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function bulk(opts) {
    const params = validateOpts(
      opts,
      ["message", "receptor", "linenumber", "senddate", "checkid"],
      ["message", "receptor", "linenumber"]
    );

    if (!params) return false;
    return api
      .post("https://api.ghasedak.io/v2/sms/send/bulk", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function pair(opts) {
    const params = validateOpts(
      opts,
      ["message", "receptor", "senddate", "checkid"],
      ["message", "receptor"]
    );

    if (!params) return false;
    return api
      .post("https://api.ghasedak.io/v2/sms/send/pair", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function verification(opts) {
    const params = validateOpts(
      opts,
      [
        "receptor",
        "template",
        "type",
        "checkid",
        "param1",
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
      ["param1", "receptor", "template", "type"]
    );

    if (!params) return false;
    return api
      .post("https://api.ghasedak.io/v2/verification/send/simple", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function voice(opts) {
    const params = validateOpts(
      opts,
      ["message", "receptor", "senddate"],
      ["message", "receptor"]
    );

    if (!params) return false;
    return api
      .post("https://api.ghasedak.io/v2/voice/send/simple", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function status(opts) {
    const params = validateOpts(opts, ["id", "type"], ["id", "type"]);

    if (!params) return false;
    return api
      .post("https://api.ghasedak.io/v2/sms/status", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function newGroup(opts) {
    const params = validateOpts(opts, ["name", "parent"], ["name"]);

    if (!params) return false;
    return api
      .post("https://api.ghasedak.io/v2/contact/group/new", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function addNumber(opts) {
    const params = validateOpts(
      opts,
      ["firstname", "lastname", "email", "groupid", "number"],
      ["groupid", "number"]
    );

    if (!params) return false;
    return api
      .post("https://api.ghasedak.io/v2/contact/group/addnumber", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function groupList(opts) {
    const params = validateOpts(opts, ["parent"], []);

    if (!params) return false;

    return api
      .post("https://api.ghasedak.io/v2/contact/group/list", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function listNumber(opts) {
    const params = validateOpts(
      opts,
      ["offset", "page", "groupid"],
      ["groupid"]
    );

    if (!params) return false;

    return api
      .post("https://api.ghasedak.io/v2/contact/group/listnumber", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function groupEdit(opts) {
    const params = validateOpts(opts, ["groupid", "name"], ["groupid", "name"]);

    if (!params) return false;

    return api
      .post("https://api.ghasedak.io/v2/contact/group/edit", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function groupRemove(opts) {
    const params = validateOpts(opts, ["groupid"], ["groupid"]);

    if (!params) return false;

    return api
      .post("https://api.ghasedak.io/v2/contact/group/remove", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function receiveLast(opts) {
    const params = validateOpts(
      opts,
      ["linenumber", "isread"],
      ["linenumber", "isread"]
    );

    if (!params) return false;

    return api
      .post("https://api.ghasedak.io/v2/sms/receive/last", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  function receivePaging(opts) {
    const params = validateOpts(
      opts,
      ["offset", "page", "todate", "fromdate", "isread", "linenumber"],
      ["offset", "page", "todate", "fromdate", "isread", "linenumber"]
    );

    if (!params) return false;

    return api
      .post("https://api.ghasedak.io/v2/sms/receive/paging", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey
        }
      })
      .then(res => {
        return res.data;
      });
  }

  return { send, bulk, pair, verification };
};
