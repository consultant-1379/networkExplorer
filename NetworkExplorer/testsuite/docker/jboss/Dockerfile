FROM armdocker.rnd.ericsson.se/proj_oss_releases/enm/jboss-dps

# Install the latest ENM ISO version of our JBoss dependencies
RUN enm ++ ERICoverloadprotection_CXP9035626
RUN enm ++ ERICcmeditcommon_CXP9035095
RUN enm ++ ERICcmread_CXP9030316
RUN enm ++ ERICtopologycollections_CXP9030498
RUN enm ++ ERICtopologysearch_CXP9030474
RUN enm ++ ERICnetworkexplorerimport_CXP9034327
RUN enm ++ ERICmodelinformationservice_CXP9031071
RUN enm ++ ERICpersistentobjectservice_CXP9031015
RUN enm ++ ERICpib_CXP9030194
RUN enm ++ ERICps_CXP9030203

# CM Components are not installed directly into the deployments folder, we need to move them
RUN mv /opt/ericsson/com.ericsson.oss.services.cm/*.ear /ericsson/3pp/jboss/standalone/deployments

HEALTHCHECK --start-period=300s --interval=30s --retries=30 CMD \
            curl --output /dev/null --silent --head --fail -H "Accept: application/json" -H "X-Tor-UserID: administrator" http://netex_jboss:8080/rest/system/time && \
            curl --output /dev/null --silent --head --fail -H "Accept: application/json" -H "X-Tor-UserID: administrator" http://netex_jboss:8080/object-configuration/collections/v2 && \
            curl --output /dev/null --silent --head --fail -H "Accept: application/json" -H "X-Tor-UserID: administrator" http://netex_jboss:8080/managedObjects/query?searchQuery=all%20nodes && \
            curl --output /dev/null --silent --head --fail -H "Accept: application/json" -H "X-Tor-UserID: administrator" http://netex_jboss:8080/modelInfo/model/EUtranCellFDD/*/attributes?hideNonSearchableAttribute=true&neType=ERBS

ENTRYPOINT ["entrypoint.sh"]

CMD ["-IP", "-s", "jboss"]
