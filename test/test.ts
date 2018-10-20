import { expect } from 'chai';
import {BimServerClient} from "../bimserverclient";

describe('BimServerClient', () => {
    it('should login with correct version', () => {

        var bimserverapi = new BimServerClient("http://localhost:8082");

        bimserverapi.login("admin@bimserver.org", "admin");

        expect(bimserverapi.idCounter).to.equal(0);

    });
});
