import { useEffect, useState } from "react";
import "./UseEffectHook.css";

type ResourceType = "posts" | "users" | "comments";

type Resources = {
  id: number;
  title: string | undefined;
  name: string | undefined;
};

type ResourceContentProps = {
  resources: Resources[];
  isLoading: boolean;
  error: string;
};

const ResourceContent = ({
  resources,
  isLoading,
  error,
}: ResourceContentProps) => {
  console.log("render from resources");

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!resources.length) return;
  return (
    <section className="resources">
      {resources.map(({ id, name, title }: Resources) => (
        <div key={id} className="resource__body">
          {name ? (
            <p className="resource-content">{name}</p>
          ) : title ? (
            <p className="resource-content">{title}</p>
          ) : null}
        </div>
      ))}
    </section>
  );
};

const UseEffectHook = () => {
  const [resourceType, setResourceType] = useState<ResourceType>(
    () => "posts" as ResourceType
  );

  const [resources, setResources] = useState<Resources[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState(() => "");

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setResources([]);
      setError("");
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/${resourceType}`
        );
        if (!response.ok) return;
        const resourceData = (await response.json()) as Resources[];
        if (resourceData.length) {
          setResources(resourceData.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(`Failed to fetch ${resourceType} data`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
    console.log("render type changed");
    console.log(resources);
  }, [resourceType]);

  return (
    <section className="resource-type__container">
      <section className="resource-type__controls">
        <button
          type="button"
          className="resource-type__controls-btn btn"
          onClick={() => setResourceType("posts")}
        >
          Posts
        </button>
        <button
          type="button"
          className="resource-type__controls-btn btn"
          onClick={() => setResourceType("users")}
        >
          Users
        </button>
        <button
          type="button"
          className="resource-type__controls-btn btn"
          onClick={() => setResourceType("comments")}
        >
          Comments
        </button>
      </section>
      <h1 className="resource-type__name">{resourceType}</h1>
      <ResourceContent
        isLoading={isLoading}
        error={error}
        resources={resources}
      />
    </section>
  );
};

export default UseEffectHook;
