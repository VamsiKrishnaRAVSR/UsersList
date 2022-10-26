import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";

import { queryConstants } from "../constants/queryConstants";
import {
  deleteUser,
  getUsers,
  patchUser,
  postUser,
} from "../services/UserDetails.services";
import { User } from "../types";

export const useGetUsers = () => {
  return useQuery([queryConstants.GET_USERS], () => getUsers());
};

export const useGetUser = (id: string) => {
  const { data, isLoading } = useGetUsers();

  console.log(id);

  const userData = useMemo(() => {
    if (data && id) {
      const p = data.find((ele: { id: number }) => ele.id === parseInt(id));
      return p;
    }
  }, [data, id]);

  return { userData, isLoading };
};

export const usePostUser = () => {
  const queryClient: QueryClient = useQueryClient();
  return useMutation((data: User) =>  postUser(data), {
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(
        [queryConstants.GET_USERS],
        (oldData: Array<User> | undefined) => {
          const p = [...(oldData as User[]), variables];
          return p;
        }
      );
    },
  });
};

export const usePatchUser = () => {
  const queryClient: QueryClient = useQueryClient();
  return useMutation((data: User) => patchUser(data), {
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(
        [queryConstants.GET_USERS],
        (oldData: User[] | undefined) => {
          const totalData = oldData?.map((ele: User) => {
            if (ele.id === variables.id) {
              return variables;
            } else {
              return ele;
            }
          });
          return totalData;
        }
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient: QueryClient = useQueryClient();
  return useMutation((data: string) => deleteUser(data), {
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(
        [queryConstants.GET_USERS],
        (oldData: User[] | undefined) => {
          console.log(oldData);

          const p = oldData?.filter((ele) => ele.id !== parseInt(variables));
          console.log(p);

          return p;
        }
      );
    },
  });
};

//  const q = oldData?.filter((ele: Todo) => ele.id !== parseInt(variables));
