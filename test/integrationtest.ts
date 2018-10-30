import {expect} from 'chai'
import {BimServerClient} from "../bimserverclient";

import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('BimServerClient', () => {

    it('promised tests without chai-as-promised work in general', function () {
        let p = new Promise((resolve, reject) => {
                resolve("bim");
            })
                .then((m) => {
                    expect(m).to.equal('bim');
                })
                .catch((m) => {
                    throw new Error('chai test failed');
                })
        ;
        return p;
    });
    it("ch-as-promised tests work in general", () => {
        return expect(Promise.resolve('bim')).to.eventually.equal('bim');
    });
    it('should return server information', function () {
        return new Promise((resolve, reject) => {

            let bimserverapi = new BimServerClient("http://localhost:8082");
            //bimserverapi.login("admin@bimserver.org", "admin");

            bimserverapi.call("AdminInterface", "getSystemInfo", {}, (data) => {
                resolve(data);
            }, (m) => {
                throw new Error(JSON.stringify(m));
            });

        })
            .then((m) => {
                expect(JSON.stringify(m)).to.contain('cpucores');
            })
            .catch((m) => {
                throw new Error(JSON.stringify(m));
            })
            ;
    });

    it('should login with correct version', () => {

        return new Promise((resolve, reject) => {
            let bimserverapi = new BimServerClient("http://localhost:8082");

            bimserverapi.login("derk@muenchhausen.de", "test", (data) => {
                resolve(data);
            }, (m) => {
                throw new Error(JSON.stringify(m));
            });
        });
    });


    /*
    it('should return server information', () => {


        return new Promise((resolve, reject) => {
            let bimserverapi = new BimServerClient("http://localhost:8082");

            bimserverapi.login("admin@bimserver.org", "xxxadmin", (data) => {
                resolve(data);
            }, (m) => {
                throw new Error(JSON.stringify(m));
            });

            setTimeout(() => reject(new Error("timeout")), 1000);
        }).then((data) => {
            expect(JSON.stringify(data)).to.contain("cpucores");
            // expect(bimserverapi.idCounter).to.equal(0);
            return data;
        }).then((data) => {
            expect(JSON.stringify(data)).to.contain("cpucores");
        }).catch((m) => {
            throw new Error('login failed');
        });
    });
*/

    /*
            it('should return server information', (done) => {

                let p = new Promise((resolve, reject) => {

                     let bimserverapi = new BimServerClient("http://localhost:8082");
                     bimserverapi.login("admin@bimserver.org", "admin");

                     bimserverapi.call("AdminInterface", "getSystemInfo", {},  (data) => {
                         //    new Date(data.datetime)
                         //    data.osname
                         // data.osversion
                         //    data.userName
                         //   data.userHome  data.userDir
                         resolve(data);
                     },(m) => {
                         throw new Error(JSON.stringify(m));
                     });
                }).then((data) => {
                    expect(JSON.stringify(data)).to.contain("cpucores");
                }).catch((m) => {
                    throw new Error('login failed');
                });
                return p;
            });
        */
});
