import { gql } from "@apollo/client";

export const COMBINED_SELECT_BASE_DATA = gql`
  query SelectData {
    base_regions {
      id
      namejson
    }
    base_sectors {
      id
      namejson
    }
    base_service_types {
      id
      name_json
    }
    base_shed_types {
      id
      name_json
    }
    base_built_by {
      id
      name_json
    }
    base_construction_levels {
      id
      name_json
    }
    base_construction_types {
      id
      name_json
    }
    base_not_transferred_reasons {
      id
      name_json
    }
    base_construction_stopped_reasons {
      id
      name_json
    }
    base_number_of_floors {
      id
      name_json
    }
  }
`;

export const GET_REGIONS = gql`
  query MyQuery {
    base_regions {
      id
      namejson
    }
  }
`;

export const GET_ZONES = gql`
  query MyQuery($where: base_zone_bool_exp) {
    base_zone(where: $where) {
      id
      namejson
      __typename
    }
  }
`;

export const GET_DISTRICT = gql`
  query MyQuery($where: base_district_bool_exp) {
    base_district(where: $where) {
      id
      namejson
    }
  }
`;

export const GET_KEBELES = gql`
  query MyQuery($where: base_kebele_bool_exp) {
    base_kebele(where: $where) {
      id
      namejson
    }
  }
`;

export const GET_WOREDA = gql`
  query MyQuery {
    base_woreda {
      id
      namejson
    }
  }
`;

export const GET_SECTORS = gql`
  query MyQuery {
    base_sectors {
      id
      namejson
    }
  }
`;

export const GET_SHED_TYPES = gql`
  query MyQuery {
    base_shed_types {
      id
      name_json
    }
  }
`;

export const GET_SERVICES_TYPES = gql`
  query MyQuery {
    base_service_types {
      id
      name_json
    }
  }
`;

export const GET_BUILT_BY = gql`
  query MyQuery {
    base_built_by {
      id
      name_json
    }
  }
`;

export const GET_CONSTRUCTION_LEVELS = gql`
  query MyQuery {
    base_construction_levels {
      id
      name_json
    }
  }
`;

export const GET_CONSTRUCTION_TYPES = gql`
  query MyQuery {
    base_construction_types {
      id
      name_json
    }
  }
`;

export const GET_CONSTRUCTION_NOT_TRANSFERRED_REASON = gql`
  query MyQuery {
    base_not_transferred_reasons {
      id
      name_json
    }
  }
`;

export const GET_CONSTRUCTION_STOPPED_REASON = gql`
  query MyQuery {
    base_construction_stopped_reasons {
      id
      name_json
    }
  }
`;

export const GET_FLOORS = gql`
  query MyQuery {
    base_number_of_floors {
      id
      name_json
    }
  }
`;
