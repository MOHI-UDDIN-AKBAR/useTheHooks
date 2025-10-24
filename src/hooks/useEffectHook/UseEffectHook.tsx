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
  error: string | null;
};

const ResourceContent = ({
  resources,
  isLoading,
  error,
}: ResourceContentProps) => {
  if (isLoading) return <div className="loading">Loading...</div>;

  if (error) return <div className="error">{error}</div>;

  if (!resources.length)
    return <div className="empty-state">No data available.</div>;

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
  const [resourceType, setResourceType] = useState<ResourceType>(() => "posts");
  const [resources, setResources] = useState<Resources[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState<string | null>(() => null);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setError(null);
      setResources([]);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/${resourceType}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${resourceType} data`);
        }

        const resourceData = (await response.json()) as Resources[];

        setResources(resourceData.slice(0, 5));
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : `Unexpected error while fetching ${resourceType}`;
        console.error(message);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [resourceType]);

  return (
    <section className="resource-type__container">
      <section className="resource-type__controls">
        {(["posts", "users", "comments"] as ResourceType[]).map((type) => (
          <button
            key={type}
            type="button"
            className="resource-type__controls-btn btn"
            onClick={() => setResourceType(type)}
          >
            {type.at(0)?.toUpperCase() + type.slice(1)}
          </button>
        ))}
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
