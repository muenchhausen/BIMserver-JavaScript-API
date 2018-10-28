import {expect} from 'chai'
import {BimServerClient} from "../bimserverclient";

describe('BimServerClient', () => {

    it('promised tests without chai-as-promised work in general', function () {
        return Promise.resolve("bim")
            .then((m) => {
                expect(m).to.equal('bim');
            })
            .catch((m) => {
                throw new Error('chai test failed');
            })
            ;
    });

/*
    it('should login with correct version', () => {


        return new Promise( (resolve, reject) => {
            let bimserverapi = new BimServerClient("http://localhost:8082");

            bimserverapi.login("admin@bimserver.org", "xxxadmin", (data) => {
               resolve(data);
            }, (m) => {
                throw new Error(m);
            });

            setTimeout(() => reject(new Error("timeout")), 1000);
        } ).then( (data) => {
            expect(JSON.stringify(data)).to.contain("cpucores");
            // expect(bimserverapi.idCounter).to.equal(0);
        }).catch( (m) => {
            throw new Error('chai test failed');
        });



    });
*/
    it('should return server information', (done) => {
        let bimserverapi = new BimServerClient("http://localhost:8082");

        return bimserverapi.call("AdminInterface", "getSystemInfo", {},  (data) => {
            console.log(JSON.stringify(data));
            //    new Date(data.datetime)
            //    data.osname
            // data.osversion
            //    data.userName
            //   data.userHome  data.userDir
            expect(JSON.stringify(data)).to.contain('cpucores');
        },(m) => {
            throw new Error(m);
        });
    });

});
