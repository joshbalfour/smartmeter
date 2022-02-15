## signup
https://api.glowmarkt.com/api-docs/v0-1/usersys/usertypes/#/user/addUser

## add meter

GET https://mapserver.glowpro.shop/postcodes/${postcode}

POST https://api.glowmarkt.com/api/v0-1/eligibility/checksmetsihd/postcode
{
    postcode: string;
    eui: string; // GUI, MAC, or EUI from IHD
}
returns
{
  valid: boolean;
}

POST https://apil.glowmarkt.com/api/v0-1/provision/eui-postcode
{
    postcode: string;
    eui: string;
}
returns
{
  virtualEntity: {
    veId: string;
  }
}

## set up glowstick device
https://api.glowmarkt.com/api-docs/v0-1/dmssys/#/
