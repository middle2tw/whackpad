

import("fastJSON");
import("jsutils");
import("netutils.urlRequest");
import("stringutils.trim");
import("sqlbase.sqlobj");
import("stringutils.toHTML");

import("etherpad.changes.follow");
import("etherpad.log");
import("etherpad.pad.padutils.{getGlobalPadId,globalToLocalId}");
import("etherpad.pad.pad_access");
import("etherpad.pad.pad_security");
import("etherpad.pro.domains");
import("etherpad.pro.pro_accounts");
import("etherpad.pro.pro_groups");
import("etherpad.pro.pro_accounts.getSessionProAccount");
import("etherpad.pro.pro_pad_db.{listMyPads,listAccessiblePads,listPublicPads}");
import("etherpad.sessions.getSession");
import("etherpad.utils.requireParam");


function render_related_get() {
  var padId = requireParam("padId");
  if (!padId) {
    return true;
  }

  var domainId = domains.getRequestDomainId();
  var filterQuery = "domainId:" + domainId;
  var userQuery = "url:*" + padId + "*";
  var limit = Number(request.params.limit) || 10;

  var query = {
    filtered: {
      query: { query_string: {query: userQuery } },
      filter: { query : {query_string: {query: filterQuery} } },
    },
  };

  var searchParams = { };
  searchParams.size = limit;
  searchParams.query = query;

  var resp = urlRequest("POST", appjet.config.elasticURL + "/etherpad/_search", JSON.stringify(searchParams));
  var hits = [];
  if (resp.status == 200) {
    hits = fastJSON.parse(resp.content)['hits']['hits'] || hits;
  }

  // if there's no results, just stop.
  if (!(hits && hits.length)) {
    response.stop();
    return true;
  }

  // if there's results, we have to make sure the user can see them
  var globalPadIds = hits.map(function(hit) { return hit._source.id });
  var allowedGlobalIds = pad_security.padIdsUserCanSee(getSessionProAccount() && getSessionProAccount().id, globalPadIds);
  var allowedSet = jsutils.arrayToSet(allowedGlobalIds);

  var list = [];
  for (var i=0; i<hits.length && i<limit; i++) {
    var id = hits[i]._source.id;
    if (!allowedSet[id]) {
      continue;
    }
    var title = hits[i]._source.title.replace(/\|/g, '');
    list.push(toHTML(title) + "|" + globalToLocalId(id));
  }

  response.write(list.join("\n"));
  return true;
}

